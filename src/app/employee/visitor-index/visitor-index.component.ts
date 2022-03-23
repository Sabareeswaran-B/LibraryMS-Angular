import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-index',
  templateUrl: './visitor-index.component.html',
  styleUrls: ['./visitor-index.component.css']
})
export class VisitorIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  collapedSideBar!: boolean;
  
  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }


}
