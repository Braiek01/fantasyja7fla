import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SliderModule } from 'primeng/slider';
import { AudioService } from '../../services/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [FormsModule, ButtonModule, TooltipModule, SliderModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  volumeValue = 50; // Volume as percentage (0-100)
  showVolumeSlider = false;
  showMobileMenu = false;
  
  private volumeSubscription: Subscription = new Subscription();

  constructor(public audioService: AudioService) {}

  ngOnInit() {
    // Initialize audio
    this.audioService.initAudio('assets/track1.mp3');
    
    // Subscribe to volume changes
    this.volumeSubscription = this.audioService.volume$.subscribe(volume => {
      this.volumeValue = Math.round(volume * 100);
    });
    
    // Set initial volume
    this.volumeValue = this.audioService.getVolumePercentage();
  }

  ngOnDestroy() {
    this.volumeSubscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const audioControls = document.querySelector('.audio-controls');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (audioControls && !audioControls.contains(target)) {
      this.showVolumeSlider = false;
    }
    
    if (mobileMenuBtn && !mobileMenuBtn.contains(target) && !target.closest('.mobile-nav')) {
      this.showMobileMenu = false;
    }
  }

  toggleAudio() {
    this.audioService.toggle();
  }

  toggleMute() {
    this.audioService.toggleMute();
  }

  toggleVolumeSlider() {
    this.showVolumeSlider = !this.showVolumeSlider;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  onVolumeChange() {
    const volume = this.volumeValue / 100; // Convert percentage to 0-1 range
    this.audioService.setVolume(volume);
  }

  getAudioIcon(): string {
    if (this.audioService.getIsMuted()) {
      return 'pi pi-volume-off';
    } else if (this.audioService.getIsPlaying()) {
      return 'pi pi-volume-up';
    } else {
      return 'pi pi-volume-down';
    }
  }

  getPlayPauseTooltip(): string {
    return this.audioService.getIsPlaying() ? 'Pause Music' : 'Play Music';
  }

  getMuteTooltip(): string {
    return this.audioService.getIsMuted() ? 'Unmute Music' : 'Mute Music';
  }
}
