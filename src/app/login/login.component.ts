import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  value = 'Clear me';
  isAlternateMode: boolean = false;
  loadingLog: boolean = false;
  loadingReg: boolean = false;
  isAnimationOn: boolean = false;
  hide: boolean = true;
  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  isAnimatedElementHidden: boolean = true;

  getErrorMessage(input) {
    if(input) {
      if (input.hasError('required')) {
        return 'You must enter a value';
      }
      if (input.hasError('minlength')) {
        return 'You must enter at least 3 characters';
      }
      if (input.hasError('email')) {
        return 'You must enter a valid email address';
      }
    }
  }
  constructor(
    private router: Router,
    private authService: AuthService) {
  }
  test() {
    if (this.isAnimatedElementHidden) {
      this.isAnimatedElementHidden = false;
      setTimeout(() => {
        this.isAnimationOn = !this.isAnimationOn;
      }, 100);
    }
    else {
      this.isAnimationOn = !this.isAnimationOn;
      setTimeout(() => {
        this.isAnimatedElementHidden = true;
      }, 100);
    }
  }


  registerBtn() {
    if (this.isAlternateMode == false)
      this.isAlternateMode = true;
      this.loadingReg = true;
    // else
    //   this.isAlternateMode = false;
    // console.log(this.isAlternateMode);
    of(null).pipe(delay(1000)).subscribe(
      {
        next: () => this.router.navigate(['register'])
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    this.loadingLog = true;
    this.email = new FormControl(this.email.value, [Validators.required, Validators.email]);
    this.password = new FormControl(this.password.value, [Validators.required, Validators.minLength(6)]);
    
    if (this.email.hasError('required') ||
        this.email.hasError('email') ||
        this.password.hasError('required')
        ) {
      setTimeout(() => {
        this.test();
      }, 1000);
      setTimeout(() => {
        this.loadingLog = false;
      }, 200);
      return;
    }
    this.authService.login({email: this.email.value, password: this.password.value})
  }
  
  ngOnInit(): void {
  }
}
