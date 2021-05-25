import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { materialize, first, dematerialize, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
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
  padding: string;
  errorOccured: boolean = false;
  errorMessage: string = '';

  pb(array: number) {
    return (array*20).toString() + 'px';
  }
  getErrorMessage(input) {
    if(input) {
      let errorArray: Array<string> = [];
      if (input.hasError('required')) {
        errorArray.push('You must enter a value');
      }
      if (input.hasError('minlength')) {
        errorArray.push('You must enter at least 3 characters');
      }

      //console.log("input.errors: "+input.errors);
      //this.padding = (errorArray.length*10).toString()+'px';
      //console.log(errorArray);
      return errorArray;
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService) {
      
    this.authService.authState().subscribe({
      next: (x) => {
        if (x) {
          this.router.navigate(['/']);
        }
      }
    });
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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
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
    this.username = new FormControl(this.username.value, [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl(this.email.value, [Validators.required, Validators.email]);
    this.password = new FormControl(this.password.value, [Validators.required, Validators.minLength(3)]);
    
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
  showErrorMessage(errorMessage) {
    this.errorOccured = true;
    this.errorMessage = errorMessage;
  }
}
