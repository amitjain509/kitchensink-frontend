import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RoleComponent } from './role/role.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RolePermissionAssignComponent } from './role-permission-assign/role-permission-assign.component';

export const routes: Routes = [
    { path: '**', redirectTo: 'login' },
    { path: '', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'menu', component: MenuComponent, 
        children: [
            { path: 'users/:userType', component: UserListComponent },
            { path: 'roles', component: RoleComponent },
            { path: 'role-permission-assign', component: RolePermissionAssignComponent }
        ]
    },
];
