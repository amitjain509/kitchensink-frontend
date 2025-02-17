import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RoleComponent } from './role/role.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PermissionAssignComponent } from './permission-assign/permission-assign.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
    { path: '', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent},
    {
        path: 'menu', component: MenuComponent,
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'users/:userType', component: UserListComponent },
            { path: 'roles', component: RoleComponent },
            { path: 'permission-assign', component: PermissionAssignComponent }
        ]
    },
];
