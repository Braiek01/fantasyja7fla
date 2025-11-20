import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SimplePlayer {
  id: string;
  name: string;
  image: string;
  category: 'ALL PLAYERS' | 'MASTERY' | 'LEGACY';
}

@Component({
  selector: 'app-player-slot',
  imports: [CommonModule],
  templateUrl: './player-slot.component.html',
  styleUrl: './player-slot.component.css'
})
export class PlayerSlotComponent {
  @Input() position: string = '';
  @Input() positionId: string = '';
  @Input() player: SimplePlayer | null = null;
  @Output() slotClicked = new EventEmitter<{position: string, positionId: string}>();

  onSlotClick() {
    this.slotClicked.emit({
      position: this.position,
      positionId: this.positionId
    });
  }
}
