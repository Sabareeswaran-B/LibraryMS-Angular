import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { AuthGuard } from '../auth.guard';
import { AuthorAddComponent } from './author-add/author-add.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorIndexComponent } from './author-index/author-index.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';
import { HomeAdminComponent } from './home-admin/home.admin.component';
import { HomeEmployeeComponent } from './home.employee/home.employee.component';
import { LendingAddComponent } from './lending-add/lending-add.component';
import { LendingEditComponent } from './lending-edit/lending-edit.component';
import { LendingIndexComponent } from './lending-index/lending-index.component';
import { VisitorAddComponent } from './visitor-add/visitor-add.component';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
import { VisitorIndexComponent } from './visitor-index/visitor-index.component';

var isAdmin = localStorage.getItem('role');

const routes: Routes = [
    {
        path: '',
        redirectTo: isAdmin != null && Number.parseInt(isAdmin) == 0 ? "admin" : "employee",
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
        path: 'admin/employee/add',
        component: EmployeeAddComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/employee/edit/:id',
        component: EmployeeEditComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/book',
        component: BookIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/book/add',
        component: BookAddComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/book/edit/:id',
        component: BookEditComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/author',
        component: AuthorIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/author/add',
        component: AuthorAddComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/author/edit/:id',
        component: AuthorEditComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/lending',
        component: LendingIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/lending/add',
        component: LendingAddComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/lending/edit/:id',
        component: LendingEditComponent,
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
        path: 'employee/visitor/add',
        component: VisitorAddComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee/visitor/edit/:id',
        component: VisitorEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee/lending',
        component: LendingIndexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee/lending/add',
        component: LendingAddComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee/lending/edit/:id',
        component: LendingEditComponent,
        canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule,],
    declarations: [],
    providers: [],
})
export class EmployeeRouterModule { }
