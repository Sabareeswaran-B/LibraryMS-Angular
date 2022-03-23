import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Visitor } from 'src/app/model/visitor.model';
import { process } from "@progress/kendo-data-query";
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-visitor-index',
  templateUrl: './visitor-index.component.html',
  styleUrls: ['./visitor-index.component.css']
})
export class VisitorIndexComponent implements OnInit {

  visitors: Visitor[] = [];
  subscriptions: Subscription[] = [];
  visitorsGridView: any[] = [];
  selectedId!: string;
  updateVisitorForm!: FormGroup;
  addNewVisitorForm!: FormGroup
  updating: boolean = false;
  adding: boolean = false;

  public selectedList: string[] = [];

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,) { }

  collapedSideBar!: boolean;

  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    })
  }

  ngOnInit(): void {
    this.updateVisitorForm = this.formBuilder.group({
      visitorId: ['', Validators.required],
      visitorName: ['', Validators.required],
      visitorAge: ['', Validators.required],
      visitorAddress: ['', Validators.required],
      visitorEmail: ['', Validators.required],
      visitorPhoneNo: ['', Validators.required],
      isEmployee: ['', Validators.required],
      isAuthor: ['', Validators.required],
    });

    this.addNewVisitorForm = this.formBuilder.group({
      visitorId: [''],
      visitorName: ['', Validators.required],
      visitorAge: ['', Validators.required],
      visitorAddress: ['', Validators.required],
      visitorEmail: ['', Validators.required],
      visitorPhoneNo: ['', Validators.required],
      isEmployee: ['', Validators.required],
      isAuthor: ['', Validators.required],
    });

    this.getAllvisitors();
  }

  getAllvisitors() {
    let _subscription = this.employeeService.getAllVisitors().subscribe({
      next: (data) => {
        this.visitors = data['data' as keyof object] as Visitor[];
        this.visitorsGridView = this.visitors;
        this.visitors.map((visitor, index) => {
          console.log(visitor.visitorName);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  public onFilter(event: Event): void {
    this.visitorsGridView = process(this.visitors, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "visitorId",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "visitorName",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "visitorAge",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "visitorAddress",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "visitorEmail",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "visitorPhoneNo",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "isEmployee",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "isAuthor",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
        ],
      },
    }).data;
  }

  displayUpdateModal: boolean = false;
  displayCreateModal: boolean = false;

  showUpdateDialog(id: string, visitor: Visitor) {
    this.displayUpdateModal = true;
    this.selectedId = id;
    this.updateVisitorForm.setValue({
      'visitorId': visitor.visitorId,
      'visitorName': visitor.visitorName,
      'visitorAge': visitor.visitorAge,
      'visitorAddress': visitor.visitorAddress,
      'visitorEmail': visitor.visitorEmail,
      'visitorPhoneNo': visitor.visitorPhoneNo,
      'isEmployee': visitor.isEmployee,
      'isAuthor': visitor.isAuthor,
    })
  }
  showCreateDialog() {
    this.displayCreateModal = true;
  }

  updateVisitor() {
    this.updating = true;
    let _subscription = this.employeeService.updateExistingVisitor(this.selectedId, this.updateVisitorForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.updating = false;
        this.displayUpdateModal = false;
        this.updateVisitorForm.reset();
        this.getAllvisitors();
      },
      error: (err) => {
        console.log(err);
        this.updating = false;
        this.displayUpdateModal = false;
      }
    })
    this.subscriptions.push(_subscription);
  }

  addNewVisitor() {
    this.adding = true;
    let _subscription = this.employeeService.addNewVisitor(this.addNewVisitorForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.adding = false;
        this.displayCreateModal = false;
        this.addNewVisitorForm.reset();
        this.getAllvisitors();
      },
      error: (err) => {
        console.log(err);
        this.adding = false;
        this.displayCreateModal = false;
      }
    })
    this.subscriptions.push(_subscription);
  }

  deleteVisitor(id: string) {
    let _subscription = this.employeeService.deleteVisitor(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllvisitors();
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.subscriptions.push(_subscription);
  }

}
