import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isActive!: boolean;
  collapsed!: boolean;
  showMenu!: string;
  pushRightClass!: string;
  items!: MenuItem[];
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

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(public router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    let role = Number.parseInt(localStorage.getItem('role')!);
    console.log(role)
    if (role == 0)
      this.items = this.adminMenuItems;
    else
      this.items = this.employeeMenuItems;
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body')!;
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }

}
