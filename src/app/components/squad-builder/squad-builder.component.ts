import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormationPitchComponent } from '../formation-pitch/formation-pitch.component';
import { BenchComponent } from '../bench/bench.component';

@Component({
  selector: 'app-squad-builder',
  imports: [
    HeaderComponent, 
    SidebarComponent,
    FormationPitchComponent,
    BenchComponent
  ],
  templateUrl: './squad-builder.component.html',
  styleUrl: './squad-builder.component.css'
})
export class SquadBuilderComponent {
  selectedFormation = '4-3-3';
  squadName = '';

  onFormationChange(formation: string) {
    this.selectedFormation = formation;
  }
}