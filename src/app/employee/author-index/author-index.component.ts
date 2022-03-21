import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { process } from "@progress/kendo-data-query";
import { Author } from 'src/app/model/author.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-index',
  templateUrl: './author-index.component.html',
  styleUrls: ['./author-index.component.css']
})
export class AuthorIndexComponent implements OnInit {

  authors: Author[] = [];
  authorsGridView: any[] = [];
  selectedId!: string;
  updateAuthorForm!: FormGroup;
  addNewAuthorForm!: FormGroup
  updating: boolean = false;
  adding: boolean = false;

  public selectedList: string[] = [];

  constructor(private adminService: AdminService, private formBuilder: FormBuilder,) { }

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
    this.adminService.getAllAuthors().subscribe({
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
    this.adminService.updateExistingAuthor(this.selectedId, this.updateAuthorForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.updating = false;
        this.displayUpdateModal = false;
        this.updateAuthorForm.reset();
        this.getAllAuthors();
      },
      error: (err) => {
        console.log(err);
        this.updating = false;
        this.displayUpdateModal = false;
      }
    })
  }

  addNewAuthor() {
    this.adding = true;
    this.adminService.addNewAuthor(this.addNewAuthorForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.adding = false;
        this.displayCreateModal = false;
        this.addNewAuthorForm.reset();
        this.getAllAuthors();
      },
      error: (err) => {
        console.log(err);
        this.adding = false;
        this.displayCreateModal = false;
      }
    })
  }

  deleteAuthor(id:string) {
    this.adminService.deleteAuthor(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllAuthors();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
