import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { menuDropDownAnimation } from '../../animations/menuDropDown';
import firebase from 'firebase/app';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  animations: [menuDropDownAnimation]
})
export class TopbarComponent implements OnInit {
  private isMenuDroppedDown: boolean = false;
  public userLoggedIn: firebase.User = null;

  constructor(public authService: AuthService) {
    this.authService.fireAuthUser.subscribe((x:firebase.User) => {
      this.userLoggedIn = x;
    })
  }
  
  menuToggle() {
    this.isMenuDroppedDown = !this.isMenuDroppedDown;
  }

  logout() {
    this.isMenuDroppedDown = false;
    this.authService.logout();
    console.log("user logged out");
  }

  ngOnInit(): void {}

}
