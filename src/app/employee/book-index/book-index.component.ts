import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/book.model';
import { AdminService } from 'src/app/service/admin.service';
import { process } from "@progress/kendo-data-query";
import { Author } from 'src/app/model/author.model';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-book-index',
  templateUrl: './book-index.component.html',
  styleUrls: ['./book-index.component.css']
})
export class BookIndexComponent implements OnInit, OnDestroy {
  authors: Author[] = [];
  books: Book[] = [];
  booksGridView: any[] = [];
  selectedId!: string;
  updateBookForm!: FormGroup;
  addNewBookForm!: FormGroup
  updating: boolean = false;
  adding: boolean = false;
  selectedAuthor!: Author;
  subscriptions: Subscription[] = [];

  public selectedList: string[] = [];

  collapedSideBar!: boolean;
  
  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

  constructor(private adminService: AdminService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.updateBookForm = this.formBuilder.group({
      bookId: [''],
      bookName: ['', Validators.required],
      authorId: ['', Validators.required],
      language: ['', Validators.required],
      releasedYear: ['', Validators.required],
      edition: ['', Validators.required],
      copiesAvailable: ['', Validators.required],
    });

    this.addNewBookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      authorId: ['', Validators.required],
      language: ['', Validators.required],
      releasedYear: ['', Validators.required],
      edition: ['', Validators.required],
      copiesAvailable: ['', Validators.required],
    });

    this.getAllBooks();
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

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    })
  }

  getAllBooks() {
    let _subscription = this.adminService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data['data' as keyof object] as Book[];
        this.booksGridView = this.books;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  getAllAuthors() {
    let _subscription = this.adminService.getAllAuthors().subscribe({
      next: (data) => {
        this.authors = data['data' as keyof object] as Author[];
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  public onFilter(event: Event): void {
    this.booksGridView = process(this.books, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "bookId",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "bookName",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "author.authorName",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "language",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "edition",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "copiesAvailable",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
        ],
      },
    }).data;
  }

  displayUpdateModal: boolean = false;
  displayCreateModal: boolean = false;

  showUpdateDialog(book: Book) {
    if (this.authors.length <= 0)
      this.getAllAuthors();
    this.displayUpdateModal = true;
    this.selectedId = book.bookId;
    this.updateBookForm.setValue({
      'bookId': book.bookId,
      'authorId': book.author,
      'bookName': book.bookName,
      'edition': book.edition,
      'language': book.language,
      'copiesAvailable': book.copiesAvailable,
      'releasedYear': book.releasedYear
    })
  }
  showCreateDialog() {
    if (this.authors.length <= 0)
      this.getAllAuthors();
    this.displayCreateModal = true;
  }

  updateBook() {
    let _updatedBook = this.updateBookForm.value;
    _updatedBook.authorId = _updatedBook.authorId.authorId;
    this.updating = true;
    let _subscription = this.adminService.updateExistingBook(this.selectedId, _updatedBook).subscribe({
      next: (data) => {
        console.log(data);
        this.updating = false;
        this.displayUpdateModal = false;
        this.updateBookForm.reset();
        this.getAllBooks();
      },
      error: (err) => {
        console.log(err);
        this.updating = false;
        this.displayUpdateModal = false;
      }
    });
    this.subscriptions.push(_subscription);
  }

  addNewBook() {
    let _newBook = this.addNewBookForm.value;
    _newBook.authorId = _newBook.authorId.authorId;
    console.log(_newBook);
    this.adding = true;
    let _subscription = this.adminService.addNewBook(_newBook).subscribe({
      next: (data) => {
        console.log(data);
        this.adding = false;
        this.displayCreateModal = false;
        this.addNewBookForm.reset();
        this.getAllBooks();
      },
      error: (err) => {
        console.log(err);
        this.adding = false;
        this.displayCreateModal = false;
      }
    });
    this.subscriptions.push(_subscription);
  }

  deleteBook(id: string) {
    let _subscription = this.adminService.deleteBook(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllBooks();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

}
