import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-addNewEmployee',
  templateUrl: './addNewEmployee.component.html',
  styleUrls: ['./addNewEmployee.component.css']
})
export class AddNewEmployeeComponent implements OnInit {

  addNewEmployeeForm!: FormGroup;
  isLoading: boolean = false;
  show = faEye as IconProp;
  hide = faEyeSlash as IconProp;
  encryptPassword = true;
  encryptCPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.addNewEmployeeForm = this.formBuilder.group({
      EmployeeName: ['', Validators.required],
      EmployeeAge: ['', Validators.required],
      EmployeeSalary: ['', Validators.required],
      EmployeeEmail: ['', Validators.required],
      EmployeePhoneNo: ['', Validators.required],
      EmployeePassword: ['', Validators.required],
    });
  }

  passwordShow() {
    this.encryptPassword = !this.encryptPassword;
  }

  cpasswordShow() {
    this.encryptCPassword = !this.encryptCPassword;
  }

  get f() { return this.addNewEmployeeForm.value; }

  register(): void {
  }

}
