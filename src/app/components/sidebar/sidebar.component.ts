import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule, SelectModule, ButtonModule, InputTextModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  squadName = '';
  selectedFormation = '4-3-3';
  
  @Output() formationChange = new EventEmitter<string>();
  
  formationOptions = [
    { label: '4-3-3 Default', value: '4-3-3' },
    { label: '4-4-2 Classic', value: '4-4-2' },
    { label: '3-5-2 Wing Play', value: '3-5-2' },
    { label: '4-2-3-1 Attacking', value: '4-2-3-1' },
    { label: '5-3-2 Defensive', value: '5-3-2' },
    { label: '3-4-3 Ultra Attack', value: '3-4-3' }
  ];

  onFormationChange() {
    this.formationChange.emit(this.selectedFormation);
  }

  clearAll() {
    this.squadName = '';
    console.log('Clearing all players');
  }

  loadSquad() {
    console.log('Loading squad');
  }
}