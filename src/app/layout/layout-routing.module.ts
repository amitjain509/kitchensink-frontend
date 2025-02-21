import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RoleComponent } from '../access-control/role/role.component';
import { PermissionAssignComponent } from '../access-control/permission-assign/permission-assign.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('../user/user.module').then(v => v.UserModule)
      },
      {
        path: 'access-control/roles',
        canActivate: [AuthGuard],
        component: RoleComponent,
      },
      {
        path: 'access-control/permissions',
        canActivate: [AuthGuard],
        component: PermissionAssignComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
