import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { delay, first } from 'rxjs/operators'
import { Router } from '@angular/router';
import { of } from 'rxjs';
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
  hide: boolean = false;
  loadingReg: boolean = false;

  getErrorMessage(input) {
    if(input) {
      if (input.hasError('required')) {
        return 'You must enter a value';
      }
      if (input.hasError('email')) {
        return 'You must enter a valid email';
      }
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
      
      this.authService.authState().subscribe({
        next: (x) => {
          if (x) this.router.navigate(['/']);
        }
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        firstName:  ['', Validators.required],
        lastName:   ['', Validators.required],
        username:   ['', Validators.required],
        email:      ['', [Validators.required, Validators.email]],
        password:   ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loadingReg = true;
    this.firstName = new FormControl(this.firstName.value, [Validators.required]);
    this.lastName = new FormControl(this.lastName.value, [Validators.required]);
    this.username = new FormControl(this.username.value, [Validators.required]);
    this.email = new FormControl(this.email.value, [Validators.required, Validators.email]);
    this.password = new FormControl(this.password.value, [Validators.required]);

    if (this.firstName.hasError('required') &&
        this.lastName.hasError('required') &&
        this.username.hasError('required') &&
        this.password.hasError('required')) {
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
      password:   this.password.value,
    }
    this.authService.register(tempUser);
  }

}
