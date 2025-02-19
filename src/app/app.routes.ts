
import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RoleComponent } from './role/role.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PermissionAssignComponent } from './permission-assign/permission-assign.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthLoginGuard } from './_guards/authlogin.guard';

export const routes: Routes = [
    // Default route
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Public routes (only accessible when NOT authenticated)
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [AuthLoginGuard]
    },

    // Protected routes (only accessible when authenticated)
    { 
        path: 'reset-password', 
        component: ResetPasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'menu',
        component: MenuComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent },
            { path: 'users/:userType', component: UserListComponent },
            { path: 'roles', component: RoleComponent },
            { path: 'permission-assign', component: PermissionAssignComponent }
        ]
    },

    // Wildcard route
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];