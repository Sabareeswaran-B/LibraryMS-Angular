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
import { GridModule } from '@progress/kendo-angular-grid';
import { PasswordModule } from "primeng/password";
import { HomeAdminComponent } from './home-admin/home.admin.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { AuthorIndexComponent } from './author-index/author-index.component';
import { AuthorAddComponent } from './author-add/author-add.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { SideNavAdminComponent } from './side-nav.admin/side-nav.admin.component';
import { HeaderComponent } from './header/header.component';
import { SideNavEmployeeComponent } from './side-nav.employee/side-nav.employee.component';
import { VisitorIndexComponent } from './visitor-index/visitor-index.component';
import { VisitorAddComponent } from './visitor-add/visitor-add.component';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
import { HomeEmployeeComponent } from './home.employee/home.employee.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { LendingIndexComponent } from './lending-index/lending-index.component';
import { LendingAddComponent } from './lending-add/lending-add.component';
import { LendingEditComponent } from './lending-edit/lending-edit.component';



@NgModule({
  declarations: [
    LoginComponent,
    AddNewEmployeeComponent,
    HomeAdminComponent,
    BookIndexComponent,
    BookAddComponent,
    BookEditComponent,
    AuthorIndexComponent,
    AuthorAddComponent,
    AuthorEditComponent,
    SideNavAdminComponent,
    HeaderComponent,
    SideNavEmployeeComponent,
    VisitorIndexComponent,
    VisitorAddComponent,
    VisitorEditComponent,
    HomeEmployeeComponent,
    EmployeeIndexComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    LendingIndexComponent,
    LendingAddComponent,
    LendingEditComponent,
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
  ],
  exports: [
    LoginComponent,
    AddNewEmployeeComponent,
    HomeAdminComponent,
    BookIndexComponent,
    BookAddComponent,
    BookEditComponent,
    AuthorIndexComponent,
    AuthorAddComponent,
    AuthorEditComponent,
    SideNavAdminComponent,
    HeaderComponent,
    SideNavEmployeeComponent,
    VisitorIndexComponent,
    VisitorAddComponent,
    VisitorEditComponent,
    HomeEmployeeComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
