import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SquadBuilderComponent } from './components/squad-builder/squad-builder.component';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SquadBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    // Add click listener to start music on first user interaction
    document.addEventListener('click', () => {
      if (!this.audioService.getIsPlaying()) {
        this.audioService.play();
      }
    }, { once: true });
  }
}
