import { Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleComponent } from './role/role.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'home', component: MenuComponent },
    { path: 'users/:userType', component: UserListComponent },
    { path: 'roles', component: RoleComponent },
    { path: 'members', component: MembersComponent }
];
