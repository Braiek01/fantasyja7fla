import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentVolume = 0.5; // Default 50% volume
  private isMuted = false;
  
  // Observable for volume changes
  private volumeSubject = new BehaviorSubject<number>(this.currentVolume);
  public volume$ = this.volumeSubject.asObservable();

  initAudio(audioPath: string) {
    console.log('Attempting to load audio from:', audioPath);
    
    this.audio = new Audio();
    this.audio.src = audioPath;
    this.audio.loop = true;
    this.audio.volume = this.currentVolume;
    this.audio.preload = 'auto';
    
    // Handle audio events with detailed logging
    this.audio.addEventListener('loadstart', () => {
      console.log('Audio loading started...');
    });

    this.audio.addEventListener('loadeddata', () => {
      console.log('✅ Audio data loaded successfully');
      console.log('Audio duration:', this.audio?.duration);
    });

    this.audio.addEventListener('canplay', () => {
      console.log('✅ Audio can start playing');
    });

    this.audio.addEventListener('canplaythrough', () => {
      console.log('✅ Audio can play through without buffering');
    });

    this.audio.addEventListener('error', (e) => {
      console.error('❌ Audio loading error:', e);
      console.error('Audio error details:', {
        code: this.audio?.error?.code,
        message: this.audio?.error?.message,
        src: this.audio?.src
      });
    });

    this.audio.addEventListener('ended', () => {
      console.log('Audio ended, restarting...');
      this.play();
    });

    // Test if file exists by trying to load it
    this.audio.load();
  }

  play() {
    if (this.audio && !this.isPlaying) {
      console.log('Attempting to play audio...');
      
      this.audio.play()
        .then(() => {
          this.isPlaying = true;
          console.log('✅ Audio started playing successfully');
        })
        .catch(error => {
          console.error('❌ Error playing audio:', error);
          console.error('Error details:', {
            name: error.name,
            message: error.message,
            readyState: this.audio?.readyState,
            networkState: this.audio?.networkState
          });
        });
    } else if (!this.audio) {
      console.error('❌ Audio not initialized');
    } else if (this.isPlaying) {
      console.log('Audio is already playing');
    }
  }

  pause() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      console.log('Audio paused');
    }
  }

  toggle() {
    console.log('Toggling audio. Current state:', this.isPlaying ? 'playing' : 'paused');
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    
    if (this.audio) {
      this.audio.volume = this.currentVolume;
    }
    
    this.volumeSubject.next(this.currentVolume);
    
    if (this.currentVolume > 0 && this.isMuted) {
      this.isMuted = false;
    }
    
    console.log('Volume set to:', Math.round(this.currentVolume * 100) + '%');
  }

  mute() {
    if (this.audio) {
      this.audio.muted = true;
      this.isMuted = true;
      console.log('Audio muted');
    }
  }

  unmute() {
    if (this.audio) {
      this.audio.muted = false;
      this.isMuted = false;
      console.log('Audio unmuted');
    }
  }

  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  // Getters
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getIsMuted(): boolean {
    return this.isMuted;
  }

  getCurrentVolume(): number {
    return this.currentVolume;
  }

  getVolumePercentage(): number {
    return Math.round(this.currentVolume * 100);
  }
}