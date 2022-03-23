import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.admin.component.html',
  styleUrls: ['./home.admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  
  constructor() { }
  
  ngOnInit() { }
  
  collapedSideBar!: boolean;
  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

}
