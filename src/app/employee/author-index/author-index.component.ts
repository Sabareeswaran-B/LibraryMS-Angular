import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { process } from "@progress/kendo-data-query";
import { Author } from 'src/app/model/author.model';

@Component({
  selector: 'app-author-index',
  templateUrl: './author-index.component.html',
  styleUrls: ['./author-index.component.css']
})
export class AuthorIndexComponent implements OnInit {

  authors: Author[] = [];
  authorsGridView: any[] = [];

  public selectedList: string[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

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
    })
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

}
