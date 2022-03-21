import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LibraryMS';
  public selected = "Inbox";
  role!: Number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = Number.parseInt(localStorage.getItem('role')!);
    if (this.role == 0)
      this.items = this.adminItems;
    else
      this.items = this.employeeItems;
  }

  public items!: Array<DrawerItem>;

  public adminItems: Array<DrawerItem> = [
    { text: "Dashboard", icon: "k-i-group" },
    { text: "Author", icon: "k-i-pencil" },
    { text: "Book", icon: "k-i-book" },
    { text: "Employee", icon: "k-i-user" },
    { text: "Visitor", icon: "k-i-user" },
    { text: "Lending", icon: "k-i-star-outline" },
  ];
  public employeeItems: Array<DrawerItem> = [
    { text: "Dashboard", icon: "k-i-group" },
    { text: "Visitor", icon: "k-i-user" },
    { text: "Lending", icon: "k-i-star-outline" },
  ];

  public onSelect(ev: DrawerSelectEvent): void {
    let path = this.router.url;
    console.log(path);
    this.selected = ev.item.text;
    switch (this.selected) {
      case "Dashboard":
        if (this.role == 0)
          this.router.navigateByUrl("/admin");
        else
          this.router.navigateByUrl("/employee");
        break;
      case "Author":
        this.router.navigateByUrl("/admin/author");
        break;
      case "Book":
        this.router.navigateByUrl("/admin/book");
        break;
      case "Employee":
        this.router.navigateByUrl("/admin/employee");
        break;
      case "Visitor":
        if (this.role == 0)
          this.router.navigateByUrl("/admin/visitor");
        else
          this.router.navigateByUrl("/employee/visitor");
        break;
      case "Lending":
        if (this.role == 0)
          this.router.navigateByUrl("/admin/lending");
        else
          this.router.navigateByUrl("/employee/lending");
        break;

      default:
        break;
    }
  }
}
