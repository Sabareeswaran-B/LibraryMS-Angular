import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/model/book.model';
import { Employee } from 'src/app/model/employee.model';
import { Lending } from 'src/app/model/lending.model';
import { Visitor } from 'src/app/model/visitor.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-lending-index',
  templateUrl: './lending-index.component.html',
  styleUrls: ['./lending-index.component.css']
})
export class LendingIndexComponent implements OnInit, OnDestroy {

  lendings: Lending[] = [];
  selectedLendings: Lending[] = [];
  subscriptions: Subscription[] = [];
  lendingsGridView: Lending[] = [];
  updateLendingForm!: FormGroup;
  addNewLendingForm!: FormGroup
  updating: boolean = false;
  adding: boolean = false;

  employees: Employee[] = [];
  visitors: Visitor[] = [];
  selectedVisitor!: Visitor;
  books: Book[] = [];
  selectedBook!: Book;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    let employeeId = localStorage.getItem('id')!;
    this.updateLendingForm = this.formBuilder.group({
      lendingId: [''],
      visitorId: ['', Validators.required],
      bookId: ['', Validators.required],
      employeeId: [employeeId, Validators.required],
      lendedOn: [''],
      lendinglimit: ['', Validators.required],
    });
    this.addNewLendingForm = this.formBuilder.group({
      lendingId: [''],
      visitorId: ['', Validators.required],
      bookId: ['', Validators.required],
      employeeId: [employeeId, Validators.required],
      lendedOn: [''],
      lendinglimit: ['', Validators.required],
    });
    this.getAllLendings();
    this.getAllBooks();
    // this.getAllEmployees();
    this.getAllVisitors();
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    })
  }

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

  getAllLendings() {
    let _subscription = this.employeeService.getAllLendings().subscribe({
      next: (data) => {
        this.lendings = data['data' as keyof object] as Lending[];
        this.lendingsGridView = this.lendings;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  getAllBooks() {
    let _subscription = this.employeeService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data['data' as keyof object] as Book[];
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  getAllEmployees() {
    let _subscription = this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data['data' as keyof object] as Employee[];
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  getAllVisitors() {
    let _subscription = this.employeeService.getAllVisitors().subscribe({
      next: (data) => {
        this.visitors = data['data' as keyof object] as Visitor[];
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  filterGlobal(event: Event) {
    let query = (event.target as HTMLInputElement).value;
    if (query.length != 0) {
      this.lendingsGridView = this.lendingsGridView.filter(lending =>
        lending.book.bookName.toString().toLowerCase().trim().includes(query) ||
        lending.employee.employeeName.toString().toLowerCase().trim().includes(query) ||
        lending.lendedOn.toString().toLowerCase().trim().includes(query) ||
        lending.lendingId.toString().toLowerCase().trim().includes(query) ||
        lending.lendinglimit.toString().toLowerCase().trim().includes(query) ||
        lending.visitor.visitorName.toString().toLowerCase().trim().includes(query)
      );
    } else {
      this.lendingsGridView = this.lendings
    }
  }

  displayUpdateModal: boolean = false;
  displayCreateModal: boolean = false;
  selectedId!: string;


  showUpdateDialog(id: string, lending: Lending) {
    this.displayUpdateModal = true;
    this.selectedId = id;
    this.updateLendingForm.setValue({
      'lendingId': lending.lendingId,
      'visitorId': lending.visitor,
      'bookId': lending.book,
      'employeeId': lending.employeeId,
      'lendedOn': lending.lendedOn,
      'lendinglimit': lending.lendinglimit
    });
  }

  showCreateDialog() {
    this.displayCreateModal = true;
  }

  updateLending() {
    this.updating = true;
    let _updateLending = this.updateLendingForm.value;
    _updateLending.visitorId = _updateLending.visitorId.visitorId;
    _updateLending.bookId = _updateLending.bookId.bookId;
    let _subscription = this.employeeService.updateExistingLending(this.selectedId, _updateLending)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.updating = false;
          this.displayUpdateModal = false;
          this.updateLendingForm.reset();
          this.getAllLendings();
        },
        error: (err) => {
          console.log(err);
          this.updating = false;
          this.displayUpdateModal = false;
        }
      });
    this.subscriptions.push(_subscription);
  }

  addNewLending() {
    this.adding = true;
    let _newLending = this.addNewLendingForm.value;
    _newLending.bookId = _newLending.bookId.bookId;
    _newLending.visitorId = _newLending.visitorId.visitorId;
    _newLending.lendinglimit = _newLending.lendinglimit.toString();
    console.log(_newLending);
    let _subscription = this.employeeService.addNewLending(_newLending)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.adding = false;
          this.displayCreateModal = false;
          this.addNewLendingForm.reset();
          this.getAllLendings();
        },
        error: (err) => {
          console.log(err);
          this.adding = false;
          this.displayCreateModal = false;
        }
      });
    this.subscriptions.push(_subscription);
  }

  deleteLending(id: string) {
    let _subscription = this.employeeService.deleteLending(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllLendings();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  calculateOverDue(dateSent: any, limit: string) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    let currentLimit =  Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
    return currentLimit > Number.parseInt(limit);
  
  }

}
