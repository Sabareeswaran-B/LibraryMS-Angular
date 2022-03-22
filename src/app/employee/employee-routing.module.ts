import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { AuthGuard } from '../auth.guard';
import { AuthorIndexComponent } from './author-index/author-index.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';
import { HomeAdminComponent } from './home.admin/home.admin.component';
import { HomeEmployeeComponent } from './home.employee/home.employee.component';
import { LendingIndexComponent } from './lending-index/lending-index.component';
import { VisitorIndexComponent } from './visitor-index/visitor-index.component';

var isAdmin = Number.parseInt(localStorage.getItem('role')!);

const routes: Routes = [
    {
        path: '',
        redirectTo: isAdmin == 0 ? "admin" : "employee",
        pathMatch: 'prefix'
    },

    {
        path: 'admin',
        component: HomeAdminComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/employee',
        component: EmployeeIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/book',
        component: BookIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/author',
        component: AuthorIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/visitor',
        component: VisitorIndexComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/lending',
        component: LendingIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
    },

    {
        path: 'employee',
        component: HomeEmployeeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee/visitor',
        component: VisitorIndexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee/lending',
        component: LendingIndexComponent,
        canActivate: [AuthGuard]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule,],
    declarations: [],
    providers: [],
})
export class EmployeeRouterModule { }
