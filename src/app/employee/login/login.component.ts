import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoginResponse } from 'src/app/model/login.response';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  show = faEye as IconProp;
  hide = faEyeSlash as IconProp;
  encryptPassword = true;
  remember = false;
  submitButtonText = "Login"
  remembermeText = "Remember me";
  finalise = new Subject<void>();

  subscriptions:Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeServices: EmployeeService,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if(!x.closed){
        x.unsubscribe();
      }
    })
  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      employeeEmail: ['', Validators.required, Validators.email],
      employeePassword: ['', Validators.required]
    });
  }




  get f() { return this.loginForm.controls; }

  login(): void {
    this.isLoading = true;
    let subscription = this.employeeServices.login({ email: this.f['employeeEmail'].value, password: this.f['employeePassword'].value })
      .subscribe({
        next: (data) => {
          var response: LoginResponse = data['data' as keyof Object] as unknown as LoginResponse;
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('role', response.role.toString());
          // if(response)
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }

      });
    this.subscriptions.push(subscription);
  }

  passwordShow() {
    this.encryptPassword = !this.encryptPassword;
  }

}
