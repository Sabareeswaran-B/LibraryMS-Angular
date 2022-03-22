import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './employee/header/header.component';
import { LoginComponent } from './employee/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./employee/employee.module').then(employee => employee.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
