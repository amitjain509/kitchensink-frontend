import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessControlComponent } from './access-control.component';
import { RoleComponent } from './role/role.component';
import { PermissionAssignComponent } from './permission-assign/permission-assign.component';

const routes: Routes = [
  {
    path: '',
    component: AccessControlComponent,
    children: [
      {
        path: '',
        redirectTo: 'roles',
        pathMatch: 'full'
      },
      {
        path: 'roles',
        component: RoleComponent,
      },
      {
        path: 'permissions',
        component: PermissionAssignComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessControlRoutingModule {}