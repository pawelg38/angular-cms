import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs/index';
import { User, UserDetails } from '../models/user';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public fireAuthUser = this.fireAuth.user;
  public fireAuthUser2 = null;
  
  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
      this.fireAuth.onAuthStateChanged( user => {
        //console.log(user);
        this.fireAuthUser2 = user;
      })
    }
  
  signInWithGoogle() {
    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then( () => {
      this.router.navigate(['1'])
    })
    .catch( error => console.log("loggin error"));
  }
  signInWithEmailAndPassword({email, password}: Credentials) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then( () => this.router.navigate(['/1']) )
    .catch( error => console.log("loggin error"));
  }
  register(user: User, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(user.email, password)
    .then( (result) => {
      result.user.updateProfile({
        displayName: user.username + ' ' + user.lastName
      });
    })
    .then( () => {
      this.router.navigate(['']);
    });
    //   .catch(function(error) {
    //     console.log("Update error.");
    //   });
    //   console.log("registration: step2 " + result.user.email);
    //   //this.SendVerificationMail();
    //   //this.SetUserData(result.user);
    // })
    // .catch((error) => {
    //   console.log("registration: step3: errors");
    //   console.log(error.code);
    //   console.log(error.message);
  }
 
  logout() {
    this.fireAuth.signOut()
    .then( () => {
      this.router.navigate(['login']);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  }
}
