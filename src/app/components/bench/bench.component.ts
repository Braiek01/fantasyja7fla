import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSelectionModalComponent } from '../player-selection-modal/player-selection-modal.component';

export interface SimplePlayer {
  id: string;
  name: string;
  image: string;
  category: 'ALL PLAYERS' | 'MASTERY' | 'LEGACY';
}

@Component({
  selector: 'app-bench',
  imports: [CommonModule, PlayerSelectionModalComponent],
  templateUrl: './bench.component.html',
  styleUrl: './bench.component.css'
})
export class BenchComponent {
  @Output() playerSelected = new EventEmitter<SimplePlayer>();

  showPlayerModal = false;
  selectedSlotIndex = -1;
  benchPlayers: (SimplePlayer | null)[] = [null, null, null, null, null, null, null];

  onBenchSlotClick(index: number) {
    this.selectedSlotIndex = index;
    this.showPlayerModal = true;
  }

  onPlayerSelected(player: SimplePlayer) {
    if (this.selectedSlotIndex >= 0) {
      this.benchPlayers[this.selectedSlotIndex] = player;
      this.showPlayerModal = false;
      this.playerSelected.emit(player);
    }
  }

  getBenchPlayerCount(): number {
    return this.benchPlayers.filter(player => player !== null).length;
  }
}
