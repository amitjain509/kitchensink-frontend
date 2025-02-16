import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleComponent } from './role/role.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'roles', component: RoleComponent },
    { path: 'members', component: MembersComponent }
];
