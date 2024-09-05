import { Component } from '@angular/core';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotesComponent],  
  template: '<app-notes></app-notes>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des Notes';
}
