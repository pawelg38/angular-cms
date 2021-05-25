import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import { User } from '../models/user';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router) { }

  authState() {
    return this.fireAuth.authState;
  }

  login({email, password}: Credentials) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log("logging in: step1 pomyslnie");
      console.log(user.user.displayName);
      this.fireAuth.onAuthStateChanged(user => {
        if (user) {
          console.log("User is signed in.")
        } else {
          console.log("No user is signed in.")
        }
      });
      this.router.navigate(['']);
    })
    .catch((error) => {
      console.log("logging in: step2: errors");
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
  register(user: User) {
    console.log("registration: step1");
    this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(result => {
      result.user.updateProfile({
        displayName: user.firstName + " " + user.lastName,
      })
      .then( () => {
        console.log("Update successful.");
        console.log(result);
      })
      .catch(function(error) {
        console.log("Update error.");
      });
      console.log("registration: step2 " + result.user.email);
      //this.SendVerificationMail();
      //this.SetUserData(result.user);
      this.router.navigate(['']);
    })
    .catch((error) => {
      console.log("registration: step3: errors");
      console.log(error.code);
      console.log(error.message);
    });
  }
 
  logout() {
    console.log("loggin out: step1: success");
    this.fireAuth.signOut()
    .then( () => {
      this.router.navigate(['login']);
    })
    .catch((error) => {
      console.log("loggin out: step3: errors");
      console.log(error.code);
      console.log(error.message);
    });
  }
}
