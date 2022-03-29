import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { process } from "@progress/kendo-data-query";
import { Author } from 'src/app/model/author.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-author-index',
  templateUrl: './author-index.component.html',
  styleUrls: ['./author-index.component.css']
})
export class AuthorIndexComponent implements OnInit, OnDestroy {

  authors: Author[] = [];
  subscriptions: Subscription[] = [];
  authorsGridView: any[] = [];
  selectedId!: string;
  updateAuthorForm!: FormGroup;
  addNewAuthorForm!: FormGroup
  updating: boolean = false;
  adding: boolean = false;

  public selectedList: string[] = [];

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private messageService: MessageService) { }

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

  ngOnInit(): void {
    this.updateAuthorForm = this.formBuilder.group({
      authorId: ['', Validators.required],
      authorName: ['', Validators.required],
      authorAge: ['', Validators.required],
      primaryLanguage: ['', Validators.required],
    });

    this.addNewAuthorForm = this.formBuilder.group({
      authorId: [''],
      authorName: ['', Validators.required],
      authorAge: ['', Validators.required],
      primaryLanguage: ['', Validators.required],
    });

    this.getAllAuthors();
  }

  getAllAuthors() {
    let _subscription = this.adminService.getAllAuthors().subscribe({
      next: (data) => {
        this.authors = data['data' as keyof object] as Author[];
        this.authorsGridView = this.authors;
        this.authors.map((author, index) => {
          console.log(author.authorName);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(_subscription);
  }

  public onFilter(event: Event): void {
    this.authorsGridView = process(this.authors, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "authorId",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "authorName",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "authorAge",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
          {
            field: "primaryLanguage",
            operator: "contains",
            value: (event.target as HTMLInputElement).value,
          },
        ],
      },
    }).data;
  }

  displayUpdateModal: boolean = false;
  displayCreateModal: boolean = false;

  showUpdateDialog(id: string, author: Author) {
    this.displayUpdateModal = true;
    this.selectedId = id;
    this.updateAuthorForm.setValue({
      'authorId': author.authorId,
      'authorName': author.authorName,
      'authorAge': author.authorAge,
      'primaryLanguage': author.primaryLanguage
    })
  }
  showCreateDialog() {
    this.displayCreateModal = true;
  }

  updateAuthor() {
    this.updating = true;
    let _subscription = this.adminService.updateExistingAuthor(this.selectedId, this.updateAuthorForm.value).subscribe({
      next: (data) => {
        console.log(data);
        let message = data['message' as keyof Object] as unknown as string
        this.messageService.add({ severity: 'success', summary: message });
        this.updating = false;
        this.displayUpdateModal = false;
        this.updateAuthorForm.reset();
        this.getAllAuthors();
      },
      error: (err) => {
        console.log(err);
        this.updating = false;
        this.displayUpdateModal = false;
        let message = err.error.message as unknown as string
        this.messageService.add({ severity: 'error', summary: message });
      }
    })
    this.subscriptions.push(_subscription);
  }

  addNewAuthor() {
    this.adding = true;
    let _subscription = this.adminService.addNewAuthor(this.addNewAuthorForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.adding = false;
        this.displayCreateModal = false;
        this.addNewAuthorForm.reset();
        this.getAllAuthors();
        let message = data['message' as keyof Object] as unknown as string
        this.messageService.add({ severity: 'success', summary: message });
      },
      error: (err) => {
        console.log(err);
        this.adding = false;
        this.displayCreateModal = false;
        let message = err.error.message as unknown as string
        this.messageService.add({ severity: 'success', summary: message });
      }
    })
    this.subscriptions.push(_subscription);
  }

  deleteAuthor(id: string) {
    let _subscription = this.adminService.deleteAuthor(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllAuthors();
        let message = data['message' as keyof Object] as unknown as string
        this.messageService.add({ severity: 'success', summary: message });
      },
      error: (err) => {
        console.log(err);
        let message = err.error.message as unknown as string
        this.messageService.add({ severity: 'success', summary: message });
      }
    })
    this.subscriptions.push(_subscription);
  }

}
