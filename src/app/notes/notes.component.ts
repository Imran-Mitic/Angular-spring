import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: any[] = []; 
  newNote = { nom: '', prenom: '', matiere: '', classe: '', note: '' };  
  editingNote: any = null; 
  showForm = false; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.http.get('http://localhost:8080/notes')
      .subscribe((data: any) => {
        this.notes = data;
      });
  }

  addOrUpdateNote() {
    if (this.editingNote) {
      this.updateNote();
    } else {
     
      this.http.post('http://localhost:8080/notes', this.newNote)
        .subscribe(() => {
          this.getNotes();  
          this.resetForm(); 
        });
    }
  }

  
  updateNote() {
    this.http.put(`http://localhost:8080/notes/${this.editingNote.id}`, this.editingNote)
      .subscribe(() => {
        this.getNotes();  
        this.resetForm(); 
      });
  }

  
  deleteNote(id: number) {
    this.http.delete(`http://localhost:8080/notes/${id}`)
      .subscribe(() => {
        this.getNotes();  
      });
  }


  editNote(note: any) {
    this.editingNote = { ...note };
    this.newNote = { ...note }; 
    this.showForm = true;
  }

  cancelEdit() {
    this.resetForm(); 
  }

  resetForm() {
    this.editingNote = null;
    this.newNote = { nom: '', prenom: '', matiere: '', classe: '', note: '' }; 
    this.showForm = false;
  }
}
