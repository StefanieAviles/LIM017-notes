import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore,  query, updateDoc } from '@angular/fire/firestore';
import { addDoc, orderBy, where} from '@firebase/firestore';

import { Observable } from 'rxjs';
import Note from './Interfaces/note.interface';


@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private firestore: Firestore) { }
  getNotes(): Observable<Note[]>{
    // const user = auth.currentUser;
    const noteRef = collection(this.firestore, 'Notes');
    const  queryRef = query(noteRef/* , where('UserId', '==', user.uid) */,orderBy('Date', 'asc'));
    return collectionData(queryRef, {idField: 'id'}) as Observable<Note[]>;
  }
}
