import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

let defaultUsers: Array<User> = [
  {
    id: '0',
    username: 'admin',
    password: 'admin1234',
    firstName: 'Admin',
    lastName: 'Adminowski',
    token: 'fake-jwt-token'
  },
  {
    id: '1',
    username: 'guest',
    password: 'guest1234',
    firstName: 'Jan',
    lastName: 'Kowalski',
    token: 'fake-jwt-token'
  }
]
const usersKey = 'usersKey';
if(!JSON.parse(localStorage.getItem(usersKey)))
  localStorage.setItem(usersKey, JSON.stringify(defaultUsers));
  defaultUsers = JSON.parse(localStorage.getItem(usersKey));

@Injectable()
export class AccountService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userSubjectValue(): User {
    return this.userSubject.value;
  }
  
  register(user: User) {
    return this.http.post('/register', user);
  }

  login(username, password) {
      return this.http.post<User>('/authenticate', { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
