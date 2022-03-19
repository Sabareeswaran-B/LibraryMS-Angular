import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './employee/login/login.component';
import { HomepageComponent } from './homepage.component';

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
