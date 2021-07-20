import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { menuDropDownAnimation } from '../../animations/menuDropDown';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  animations: [menuDropDownAnimation]
})
export class TopbarComponent implements OnInit {
  public loggedIn: boolean = false;
  private isMenuDroppedDown: boolean;

  constructor(public authService: AuthService) {}
  
  menuToggle() {
    this.isMenuDroppedDown = !this.isMenuDroppedDown;
  }

  logout() {
    this.isMenuDroppedDown = false;
    this.authService.logout();
  }

  ngOnInit(): void {}

}
