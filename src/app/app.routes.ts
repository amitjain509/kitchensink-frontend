import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginPermissionGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' , canActivate: [LoginPermissionGuard]},
  { path: 'register', component: RegisterComponent, title: 'Register', canActivate: [LoginPermissionGuard] },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'admin', component: AdminComponent, title: 'Admin' },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Default route to login
];
