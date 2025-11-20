import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

export interface SimplePlayer {
  id: string;
  name: string;
  image: string;
  category: 'ALL PLAYERS' | 'MASTERY' | 'LEGACY';
}

@Component({
  selector: 'app-player-selection-modal',
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './player-selection-modal.component.html',
  styleUrl: './player-selection-modal.component.css'
})
export class PlayerSelectionModalComponent implements OnInit {
  @Input() visible = false;
  @Input() position = '';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() playerSelected = new EventEmitter<SimplePlayer>();

  players: SimplePlayer[] = [];
  selectedFilter = 'ALL PLAYERS';

  filters = [
    { label: 'ALL PLAYERS', value: 'ALL PLAYERS' },
    { label: 'MASTERY', value: 'MASTERY' },
    { label: 'LEGACY', value: 'LEGACY' }
  ];

  ngOnInit() {
    this.loadPlayersFromAssets();
  }

  loadPlayersFromAssets() {
    // Just list the player images you have in your assets folder
    // You can add or remove players by simply adding/removing images from assets
    const playerImages = [
      'OBZ.png',
      'wahchi.png',
      'klay.png',
      'samalapa.png',
      'pessiron.png',
      'samara.png',
      'apeu.png',
      "piroman.png",
      'malika.png',
      'kartoucha.png',
      'gattouz.png',
      'tounsi.png',
      'chouligaa.png',
      'samir.png',
      'watatata.png',
      'laya.png',
      'hentati.png',
      'waywa.png',
      'casimiro.png',
      'yosri.png',
      'dhouha.png',
      'mraweb.png',
      'Colombi.png',
      'cheba mira.png',
      'malikos.png',
      'ghanouchi.png',
      'la7lou7a.png'
      
    ];

    this.players = playerImages.map((image, index) => ({
      id: `player_${index + 1}`,
      name: this.getPlayerNameFromImage(image),
      image: `assets/${image}`,
      category: this.getRandomCategory()
    }));
  }

  getPlayerNameFromImage(imageName: string): string {
    // Extract player name from image filename
    return imageName.replace('.png', '').toUpperCase();
  }

  getRandomCategory(): 'MASTERY' | 'LEGACY' {
    // Randomly assign categories (you can customize this logic)
    return Math.random() > 0.5 ? 'MASTERY' : 'LEGACY';
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
  }

  getFilteredPlayers(): SimplePlayer[] {
    if (this.selectedFilter === 'ALL PLAYERS') {
      return this.players;
    }
    return this.players.filter(player => player.category === this.selectedFilter);
  }

  selectPlayer(player: SimplePlayer) {
    this.playerSelected.emit(player);
    this.closeModal();
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onHide() {
    this.closeModal();
  }

  getCardBackground(category: string): string {
    switch (category) {
      case 'MASTERY': return 'linear-gradient(135deg, #1a4c96 0%, #2563eb 100%)';
      case 'LEGACY': return 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)';
      default: return 'linear-gradient(135deg, #374151 0%, #6b7280 100%)';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'MASTERY': return 'pi pi-star-fill';
      case 'LEGACY': return 'pi pi-crown';
      default: return 'pi pi-circle-fill';
    }
  }
}
