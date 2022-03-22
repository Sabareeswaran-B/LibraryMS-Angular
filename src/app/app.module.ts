import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { HomepageComponent } from './homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@progress/kendo-angular-layout';






@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    RouterModule,
    FontAwesomeModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    DateInputsModule,
    HttpClientModule,
    ExcelModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
