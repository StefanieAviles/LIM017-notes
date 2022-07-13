import { Component, OnInit } from '@angular/core';
import { FirestoreDataService } from '../firestore-data.service';
import Note from '../Interfaces/note.interface';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] | undefined;
  constructor(private firestoreDataService : FirestoreDataService) { }

  ngOnInit(): void {
    this.firestoreDataService.getNotes().subscribe(notes => {
      console.log(notes);
      this.notes = notes;
    })
  }
}
