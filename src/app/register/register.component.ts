import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  firstName = new FormControl('');
  lastName = new FormControl('');
  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  hide: boolean = true;
  loadingReg: boolean = false;

  constructor(
    private authService: AuthService) {
  }

  getErrorMessage(input) {
    if(input) {
      if (input.hasError('required')) {
        return 'You must enter a value';
      }
      if (input.hasError('minlength')) {
        return 'You must enter at least 6 characters';
      }
      if (input.hasError('email')) {
        return 'You must enter a valid email address';
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loadingReg = true;
    this.firstName = new FormControl(this.firstName.value, [Validators.required, Validators.minLength(3)]);
    this.lastName = new FormControl(this.lastName.value, [Validators.required, Validators.minLength(3)]);
    this.username = new FormControl(this.username.value, [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl(this.email.value, [Validators.required, Validators.email]);
    this.password = new FormControl(this.password.value, [Validators.required, Validators.minLength(6)]);

    if (this.firstName.hasError('required') ||
        this.firstName.hasError('minlength') ||
        this.lastName.hasError('required') ||
        this.lastName.hasError('minlength') ||
        this.username.hasError('required') ||
        this.username.hasError('minlength') ||
        this.email.hasError('required') ||
        this.email.hasError('email') ||
        this.password.hasError('required') ||
        this.password.hasError('minlength')) {

          setTimeout(() => {
            this.loadingReg = false;
          }, 200);
          return;
    }

    let tempUser: User = {
      firstName:  this.firstName.value,
      lastName:   this.lastName.value,
      username:   this.username.value,
      email:      this.email.value,
    }
    this.authService.register(tempUser, this.password.value);
  }

  ngOnInit(): void {
  }
}
