import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSlotComponent } from '../player-slot/player-slot.component';
import { PlayerSelectionModalComponent } from '../player-selection-modal/player-selection-modal.component';

export interface SimplePlayer {
  id: string;
  name: string;
  image: string;
  category: 'ALL PLAYERS' | 'MASTERY' | 'LEGACY';
}

@Component({
  selector: 'app-formation-pitch',
  imports: [CommonModule, PlayerSlotComponent, PlayerSelectionModalComponent],
  templateUrl: './formation-pitch.component.html',
  styleUrl: './formation-pitch.component.css'
})
export class FormationPitchComponent implements OnInit, OnChanges {
  @Input() selectedFormation: string = '4-3-3';
  
  // Player selection modal properties
  showPlayerModal = false;
  selectedPosition = '';
  selectedPositionId = '';
  squadPlayers: { [positionId: string]: SimplePlayer | null } = {};
  
  formation: any = {};
  getPositionClass(position: string): string {
  if (position === 'GK') return 'goalkeeper';
  if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(position)) return 'defender';
  if (['CM', 'CDM', 'CAM', 'LM', 'RM'].includes(position)) return 'midfielder';
  if (['ST', 'LW', 'RW', 'CF'].includes(position)) return 'forward';
  return '';
}
  formations = {
    '4-3-3': {
      forwards: [
        { position: 'LW', positionId: 'LW-1', top: 15, left: 20 },
        { position: 'ST', positionId: 'ST-1', top: 8, left: 50 },
        { position: 'RW', positionId: 'RW-1', top: 15, left: 80 }
      ],
      midfielders: [
        { position: 'CM', positionId: 'CM-1', top: 35, left: 32 },
        { position: 'CM', positionId: 'CM-2', top: 42, left: 50 },
        { position: 'CM', positionId: 'CM-3', top: 35, left: 68 }
      ],
      defenders: [
        { position: 'LB', positionId: 'LB-1', top: 68, left: 15 },
        { position: 'CB', positionId: 'CB-1', top: 72, left: 35 },
        { position: 'CB', positionId: 'CB-2', top: 72, left: 65 },
        { position: 'RB', positionId: 'RB-1', top: 68, left: 85 }
      ],
      goalkeeper: [
        { position: 'GK', positionId: 'GK-1', top: 90, left: 50 }
      ]
    },
    '4-4-2': {
      forwards: [
        { position: 'ST', positionId: 'ST-1', top: 12, left: 38 },
        { position: 'ST', positionId: 'ST-2', top: 12, left: 62 }
      ],
      midfielders: [
        { position: 'LM', positionId: 'LM-1', top: 40, left: 15 },
        { position: 'CM', positionId: 'CM-1', top: 45, left: 38 },
        { position: 'CM', positionId: 'CM-2', top: 45, left: 62 },
        { position: 'RM', positionId: 'RM-1', top: 40, left: 85 }
      ],
      defenders: [
        { position: 'LB', positionId: 'LB-1', top: 68, left: 15 },
        { position: 'CB', positionId: 'CB-1', top: 72, left: 35 },
        { position: 'CB', positionId: 'CB-2', top: 72, left: 65 },
        { position: 'RB', positionId: 'RB-1', top: 68, left: 85 }
      ],
      goalkeeper: [
        { position: 'GK', positionId: 'GK-1', top: 90, left: 50 }
      ]
    },
    '3-5-2': {
      forwards: [
        { position: 'ST', positionId: 'ST-1', top: 12, left: 38 },
        { position: 'ST', positionId: 'ST-2', top: 12, left: 62 }
      ],
      midfielders: [
        { position: 'LWB', positionId: 'LWB-1', top: 35, left: 12 },
        { position: 'CM', positionId: 'CM-1', top: 45, left: 30 },
        { position: 'CM', positionId: 'CM-2', top: 48, left: 50 },
        { position: 'CM', positionId: 'CM-3', top: 45, left: 70 },
        { position: 'RWB', positionId: 'RWB-1', top: 35, left: 88 }
      ],
      defenders: [
        { position: 'CB', positionId: 'CB-1', top: 72, left: 28 },
        { position: 'CB', positionId: 'CB-2', top: 75, left: 50 },
        { position: 'CB', positionId: 'CB-3', top: 72, left: 72 }
      ],
      goalkeeper: [
        { position: 'GK', positionId: 'GK-1', top: 90, left: 50 }
      ]
    },
    '4-2-3-1': {
      forwards: [
        { position: 'ST', positionId: 'ST-1', top: 8, left: 50 }
      ],
      midfielders: [
        { position: 'LW', positionId: 'LW-1', top: 25, left: 20 },
        { position: 'CAM', positionId: 'CAM-1', top: 30, left: 50 },
        { position: 'RW', positionId: 'RW-1', top: 25, left: 80 },
        { position: 'CDM', positionId: 'CDM-1', top: 52, left: 38 },
        { position: 'CDM', positionId: 'CDM-2', top: 52, left: 62 }
      ],
      defenders: [
        { position: 'LB', positionId: 'LB-1', top: 68, left: 15 },
        { position: 'CB', positionId: 'CB-1', top: 72, left: 35 },
        { position: 'CB', positionId: 'CB-2', top: 72, left: 65 },
        { position: 'RB', positionId: 'RB-1', top: 68, left: 85 }
      ],
      goalkeeper: [
        { position: 'GK', positionId: 'GK-1', top: 90, left: 50 }
      ]
    },
    '5-3-2': {
      forwards: [
        { position: 'ST', positionId: 'ST-1', top: 12, left: 38 },
        { position: 'ST', positionId: 'ST-2', top: 12, left: 62 }
      ],
      midfielders: [
        { position: 'CM', positionId: 'CM-1', top: 45, left: 30 },
        { position: 'CM', positionId: 'CM-2', top: 48, left: 50 },
        { position: 'CM', positionId: 'CM-3', top: 45, left: 70 }
      ],
      defenders: [
        { position: 'LWB', positionId: 'LWB-1', top: 68, left: 8 },
        { position: 'CB', positionId: 'CB-1', top: 72, left: 26 },
        { position: 'CB', positionId: 'CB-2', top: 75, left: 50 },
        { position: 'CB', positionId: 'CB-3', top: 72, left: 74 },
        { position: 'RWB', positionId: 'RWB-1', top: 68, left: 92 }
      ],
      goalkeeper: [
        { position: 'GK', positionId: 'GK-1', top: 90, left: 50 }
      ]
    },
    '3-4-3': {
      forwards: [
        { position: 'LW', positionId: 'LW-1', top: 15, left: 20 },
        { position: 'ST', positionId: 'ST-1', top: 8, left: 50 },
        { position: 'RW', positionId: 'RW-1', top: 15, left: 80 }
      ],
      midfielders: [
        { position: 'LM', positionId: 'LM-1', top: 42, left: 15 },
        { position: 'CM', positionId: 'CM-1', top: 48, left: 38 },
        { position: 'CM', positionId: 'CM-2', top: 48, left: 62 },
        { position: 'RM', positionId: 'RM-1', top: 42, left: 85 }
      ],
      defenders: [
        { position: 'CB', positionId: 'CB-1', top: 72, left: 28 },
        { position: 'CB', positionId: 'CB-2', top: 75, left: 50 },
        { position: 'CB', positionId: 'CB-3', top: 72, left: 72 }
      ],
      goalkeeper: [
        { position: 'GK', positionId: 'GK-1', top: 90, left: 50 }
      ]
    }
  };

  ngOnInit() {
    this.updateFormation();
  }

  ngOnChanges() {
    this.updateFormation();
  }

  updateFormation() {
    this.formation = this.formations[this.selectedFormation as keyof typeof this.formations] || this.formations['4-3-3'];
  }

  getAllPlayers() {
    return [
      ...(this.formation.forwards || []),
      ...(this.formation.midfielders || []),
      ...(this.formation.defenders || []),
      ...(this.formation.goalkeeper || [])
    ];
  }

  // Player selection modal methods
  onSlotClicked(position: string, positionId: string) {
    this.selectedPosition = position;
    this.selectedPositionId = positionId;
    this.showPlayerModal = true;
  }

  onPlayerSelected(player: SimplePlayer) {
    this.squadPlayers[this.selectedPositionId] = player;
    this.showPlayerModal = false;
  }

  getPlayerForPosition(positionId: string): SimplePlayer | null {
    return this.squadPlayers[positionId] || null;
  }
}
