import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoginResponse } from 'src/app/model/login.response';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
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

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeServices: EmployeeService,
    private toastr: ToastrService,
    private messageService: MessageService,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    })
  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      employeeEmail: ['', Validators.required],
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
          // this.toastr.success(data['message' as keyof Object] as unknown as string);
          let message = data['message' as keyof Object] as unknown as string
          this.messageService.add({ severity: 'success', summary: message });
          this.router.navigate([''], { replaceUrl: true });
        },
        error: (error) => {
          console.log(error);
          let message = error.error.message as unknown as string
          this.messageService.add({ severity: 'error', summary: message });
          this.isLoading = false;
        }

      });
    this.subscriptions.push(subscription);
  }

  passwordShow() {
    this.encryptPassword = !this.encryptPassword;
  }

}
