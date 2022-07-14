import { Component, OnInit } from '@angular/core';
import { FirestoreDataService } from '../firestore-data.service';
import Note from '../Interfaces/note.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes!: Note[];
  constructor(private firestoreDataService : FirestoreDataService) { }

  ngOnInit(): void {
    this.firestoreDataService.getNotes().subscribe(notes => {
      console.log(notes);
      this.notes = notes;
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
}
