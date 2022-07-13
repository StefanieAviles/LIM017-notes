import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  GoogleAuthProvider, signInWithPopup,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private auth: Auth) { }

  register (email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logIn(email: string, password: string){
    
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }
  signInGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

}
