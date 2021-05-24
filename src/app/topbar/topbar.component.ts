import { BoundElementProperty } from '@angular/compiler';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable, from } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
    //this.trigger.focus();
    //this.trigger.restoreFocus=false;
  }

  private user: User;
  public loggedIn: boolean = false;
  isMenuDropListShowed: boolean = false;
  isAnimationOn: boolean = false;
  test11: boolean = true;
  isMenuDroppedDown: boolean = false;
  isMenuAnimationOn: boolean = false;

  test() {
    if (this.isMenuDropListShowed) {
      this.isAnimationOn = false;
      setTimeout(() => {
        this.isMenuDropListShowed = false;
      }, 1000);
    }
    else {
      this.isMenuDropListShowed = true;
      setTimeout(() => {
        this.isAnimationOn = true;
      }, 1000);
    }
  }
  test1() {
    this.test11 = !this.test11;
    //this.someMethod();
    setTimeout(() => {
      // this.test11 = !this.test11;
       this.someMethod();
    }, 10);
  }
  menuDropDown() {
    if(this.isMenuDroppedDown) {
      this.isMenuAnimationOn = false;
      setTimeout(() => {
        this.isMenuDroppedDown = false;
      }, 50);
    }
    else {
      this.isMenuDroppedDown = true;
      setTimeout(() => {
        this.isMenuAnimationOn = true;
      }, 50);
    }
  }

  constructor(private accountService: AccountService) {
    this.accountService.userSubject.subscribe(x => {
      if(x) {
        this.loggedIn = true;
        this.user = this.accountService.userSubjectValue;
      }
      else {
        this.loggedIn = false;
        this.user = null;
      }
    })
  }

  public get userInfo() {
    return this.user.firstName;
  }

  logout() {
    this.accountService.logout();
  }

  ngOnInit(): void {
  }

}
