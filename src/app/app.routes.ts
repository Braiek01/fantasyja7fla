import { Routes } from '@angular/router';
import { SquadBuilderComponent } from './components/squad-builder/squad-builder.component';

export const routes: Routes = [
  { path: '', redirectTo: '/squad-builder', pathMatch: 'full' },
  { path: 'squad-builder', component: SquadBuilderComponent },
  { path: '**', redirectTo: '/squad-builder' } // Wildcard route for 404 page
];
