import { Component, OnInit } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from "@progress/kendo-angular-layout";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public selected = "Inbox";

  public items: Array<DrawerItem> = [
    { text: "Dashboard", icon: "k-i-inbox", selected: true },
    { text: "Author", icon: "k-i-bell" },
    { text: "Book", icon: "k-i-calendar" },
    { text: "Employee", icon: "k-i-hyperlink-email" },
    { text: "Lending", icon: "k-i-star-outline" },
  ];

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
    console.log(this.selected);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
