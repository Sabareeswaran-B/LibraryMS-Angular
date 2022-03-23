import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AddNewEmployeeComponent } from './addNewEmployee/addNewEmployee.component';
import { EmployeeRouterModule } from './employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { CalendarModule } from "primeng/calendar";
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';
import { PasswordModule } from "primeng/password";
import { HomeAdminComponent } from './home.admin/home.admin.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { AuthorIndexComponent } from './author-index/author-index.component';
import { HeaderComponent } from './header/header.component';
import { VisitorIndexComponent } from './visitor-index/visitor-index.component';
import { HomeEmployeeComponent } from './home.employee/home.employee.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';
import { LendingIndexComponent } from './lending-index/lending-index.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    LoginComponent,
    AddNewEmployeeComponent,
    HomeAdminComponent,
    BookIndexComponent,
    AuthorIndexComponent,
    HeaderComponent,
    VisitorIndexComponent,
    HomeEmployeeComponent,
    EmployeeIndexComponent,
    LendingIndexComponent,
    SidebarComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    EmployeeRouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonsModule,
    GridModule,
    DateInputsModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    PasswordModule,
    ExcelModule,
    DialogModule,
    LayoutModule,
    DropdownModule,
  ],
  exports: [
    LoginComponent,
    AddNewEmployeeComponent,
    HomeAdminComponent,
    BookIndexComponent,
    AuthorIndexComponent,
    HeaderComponent,
    VisitorIndexComponent,
    HomeEmployeeComponent,
    EmployeeIndexComponent,
    LendingIndexComponent,
    SidebarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
