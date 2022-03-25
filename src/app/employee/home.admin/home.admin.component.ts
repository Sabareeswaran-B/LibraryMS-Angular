import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/model/book.model';
import { Lending } from 'src/app/model/lending.model';
import { Visitor } from 'src/app/model/visitor.model';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.admin.component.html',
  styleUrls: ['./home.admin.component.css']
})
export class HomeAdminComponent implements OnInit, OnDestroy {

  
  books: Book[] = [];
  titles: number = 0;
  copies: number = 0;
  subscriptions: Subscription[] = [];
  lendings: Lending[] = [];
  outStandingLendings: number = 0;
  overDuelendings: Lending[] = [];
  lendingsMonthVice: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  visitors: Visitor[] = [];
  addNewLendingForm!: FormGroup
  adding: boolean = false;
  displayCreateModal: boolean = false;


  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,) { }
  
  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    })
  }

  ngOnInit(): void {
    let employeeId = localStorage.getItem('id')!;
    this.addNewLendingForm = this.formBuilder.group({
      lendingId: [''],
      visitorId: ['', Validators.required],
      bookId: ['', Validators.required],
      employeeId: [employeeId, Validators.required],
      lendedOn: [''],
      lendinglimit: ['', Validators.required],
    });
    this.getAllBooks();
    this.getAllVisitors();
    this.getAllLendings();
  }

  collapedSideBar!: boolean;
  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

  getAllBooks() {
    let _subscription = this.employeeService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data['data' as keyof object] as Book[];
        this.titles = this.books.length;
        this.books.map(book => {
          this.copies += Number.parseInt(book.copiesAvailable);
        });
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


  showCreateDialog() {
    this.displayCreateModal = true;
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


  getAllLendings() {
    let _subscription = this.employeeService.getAllLendings().subscribe({
      next: (data) => {
        this.lendings = data['data' as keyof object] as Lending[];
        this.outStandingLendings = this.lendings.length;
        this.overDuelendings = this.lendings;
        this.overDuelendings = this.lendings.filter(lending => {
          return Number.parseInt(lending.lendinglimit) <= this.calculateDiff(lending.lendedOn)
        })
        this.lendings.map((lending, index) => {
          let date = new Date(lending.lendedOn);
          let i = date.getMonth();
          this.lendingsMonthVice[i] += 1;
        })
        console.log(this.lendingsMonthVice)
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  calculateDiff(dateSent: any) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

}
