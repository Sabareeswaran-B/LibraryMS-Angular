import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { process } from "@progress/kendo-data-query";
import { AdminService } from 'src/app/service/admin.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.css']
})
export class EmployeeIndexComponent implements OnInit {

  employees: Employee[] = [];
  employeesGridView: any[] = [];
  selectedId!: string;
  updateEmployeeForm!: FormGroup;
  addNewEmployeeForm!: FormGroup
  updating: boolean = false;
  adding: boolean = false;
  show = faEye as IconProp;
  hide = faEyeSlash as IconProp;
  encryptPassword = true;

  public selectedList: string[] = [];

  constructor(private adminService: AdminService, private formBuilder: FormBuilder,) { }

  passwordShow() {
    this.encryptPassword = !this.encryptPassword;
  }

  ngOnInit(): void {
    this.updateEmployeeForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeeAge: ['', Validators.required],
      employeeRole: ['', Validators.required],
      employeeEmail: ['', Validators.required, Validators.email],
      employeePhoneNo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.addNewEmployeeForm = this.formBuilder.group({
      employeeId: [''],
      employeeName: ['', Validators.required],
      employeeAge: ['', Validators.required],
      employeeRole: ['', Validators.required],
      employeeEmail: ['', Validators.required, Validators.email],
      employeePhoneNo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.getAllEmployees();
  }

  getAllEmployees() {
    this.adminService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data['data' as keyof object] as Employee[];
        this.employeesGridView = this.employees;
        this.employees.map((employee, index) => {
          console.log(employee.employeeName);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public onFilter(event: Event): void {
    this.employeesGridView = process(this.employees, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "employeeId",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "employeeName",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "employeeAge",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "employeeRole",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "employeeEmail",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "employeePhoneNo",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
        ],
      },
    }).data;
  }

  displayUpdateModal: boolean = false;
  displayCreateModal: boolean = false;

  showUpdateDialog(id: string, employee: Employee) {
    this.displayUpdateModal = true;
    this.selectedId = id;
    this.updateEmployeeForm.setValue({
      'employeeId': employee.employeeId,
      'employeeName': employee.employeeName,
      'employeeAge': employee.employeeAge,
      'employeeRole': employee.employeeRole,
      'employeeEmail': employee.employeeEmail,
      'employeePhoneNo': employee.employeePhoneNo,
    })
  }
  showCreateDialog() {
    this.displayCreateModal = true;
  }

  updateEmployee() {
    this.updating = true;
    this.adminService.updateExistingEmployee(this.selectedId, this.updateEmployeeForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.updating = false;
        this.displayUpdateModal = false;
        this.updateEmployeeForm.reset();
        this.getAllEmployees();
      },
      error: (err) => {
        console.log(err);
        this.updating = false;
        this.displayUpdateModal = false;
      }
    })
  }

  addNewEmployee() {
    this.adding = true;
    this.adminService.addNewEmployee(this.addNewEmployeeForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.adding = false;
        this.displayCreateModal = false;
        this.addNewEmployeeForm.reset();
        this.getAllEmployees();
      },
      error: (err) => {
        console.log(err);
        this.adding = false;
        this.displayCreateModal = false;
      }
    })
  }

  deleteemployee(id: string) {
    this.adminService.deleteEmployee(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllEmployees();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
