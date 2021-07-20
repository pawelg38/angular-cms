import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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
  public userInfo: User;
  public userLoggedIn = new BehaviorSubject(null);

  constructor(
    public fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {

      this.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          console.log("user signed in");
          //console.log(user);
          this.userLoggedIn.next(user);
        } else {
          this.userLoggedIn.next(false);
        }
      });
      // let userDetails2: UserDetails;
      // let userDetails3: Array<UserDetails>;
      // const users = this.db.collection('users').valueChanges();
      // //const users = this.db.collection('users',ref => ref.where('surname', '==', 'surname3')).valueChanges();
      // //this.db.collection('users').add({username:'username4'});
      // users.subscribe({
      //   next: (x: Array<UserDetails>) => {
      //     //console.log(x)
      //     userDetails3 = x;
      //     console.log(userDetails3);
      //   }
      // });
  }

  authState() {
    // if (this.fireAuth.authState){
    //   return this.userInfo;
    // }
    return this.fireAuth.authState;
  }
  getData() {
    this.fireAuth.authState
    .subscribe( res => {
      if (res) {
        console.log("getData() runs");
        this.db.collection('posts').valueChanges()
        .subscribe( res => console.log(res));
      }
      else {
        console.log("res err: ", res);
      }
    })
  }

  login({email, password}: Credentials) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then( () => this.router.navigate(['']) )
    .catch( error => console.log("loggin error"));
  }
  register(user: User, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(user.email, password)
    .then(result => {
      this.db.collection('users')
      .add({
        username: user.username,
        email: result.user.email,
        name: user.firstName,
        surname: user.lastName,
        uid: result.user.uid
      });
      //result.user.updateProfile({displayName: user.firstName + " " + user.lastName});
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
