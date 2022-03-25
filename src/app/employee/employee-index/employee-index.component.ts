import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { process } from "@progress/kendo-data-query";
import { AdminService } from 'src/app/service/admin.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.css']
})
export class EmployeeIndexComponent implements OnInit, OnDestroy {

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
  subscriptions: Subscription[] = [];

  public selectedList: string[] = [];

  collapedSideBar!: boolean;
  
  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

  adminMenuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: '/admin/dashboard' },
    { label: 'Author', icon: 'pi pi-pencil', routerLink: '/admin/author' },
    { label: 'Book', icon: 'pi pi-book', routerLink: '/admin/book' },
    { label: 'Employee', icon: 'pi pi-id-card', routerLink: '/admin/employee' },
    { label: 'Visitor', icon: 'pi pi-user', routerLink: '/admin/visitor' },
    { label: 'Lending', icon: 'pi pi-star', routerLink: '/admin/lending' },
    { label: 'Logout', icon: 'k-icon k-i-undo', routerLink: '/login' },
  ];
  employeeMenuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: '/employee/dashboard' },
    { label: 'Visitor', icon: 'pi pi-user', routerLink: '/employee/visitor' },
    { label: 'Lending', icon: 'pi pi-star', routerLink: '/employee/lending' },
    { label: 'Logout', icon: 'k-icon k-i-undo', routerLink: '/login' },
  ];


  constructor(private adminService: AdminService, private formBuilder: FormBuilder,) { }

  passwordShow() {
    this.encryptPassword = !this.encryptPassword;
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    })
  }

  ngOnInit(): void {
    this.updateEmployeeForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeeAge: ['', Validators.required],
      employeeRole: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeePhoneNo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.addNewEmployeeForm = this.formBuilder.group({
      employeeId: [''],
      employeeName: ['', Validators.required],
      employeeAge: ['', Validators.required],
      employeeRole: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeePhoneNo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.getAllEmployees();
  }

  getAllEmployees() {
    let _subscription = this.adminService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data['data' as keyof object] as Employee[];
        this.employeesGridView = this.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
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
    console.log(employee);
    this.displayUpdateModal = true;
    this.selectedId = id;
    this.updateEmployeeForm.setValue({
      'employeeId': employee.employeeId,
      'employeeName': employee.employeeName,
      'employeeAge': employee.employeeAge,
      'employeeRole': employee.employeeRole,
      'employeeEmail': employee.employeeEmail,
      'employeePhoneNo': employee.employeePhoneNo,
      'password': "",
    })
  }
  showCreateDialog() {
    this.displayCreateModal = true;
  }

  updateEmployee() {
    this.updating = true;
    let _subscription = this.adminService.updateExistingEmployee(this.selectedId, this.updateEmployeeForm.value)
    .subscribe({
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
    });
    this.subscriptions.push(_subscription);
  }

  addNewEmployee() {
    this.adding = true;
    let _subscription = this.adminService.addNewEmployee(this.addNewEmployeeForm.value)
    .subscribe({
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
    });
    this.subscriptions.push(_subscription);
  }

  deleteemployee(id: string) {
    let _subscription = this.adminService.deleteEmployee(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllEmployees();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

}
