import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { RoleComponent } from './role/role.component';
import { AccessControlComponent } from './access-control.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionAssignComponent } from './permission-assign/permission-assign.component';

const routes: Routes = [
  {
    path: '',
    component: AccessControlComponent
  }
];


@NgModule({
  declarations:[
    
  ],
  imports: [
    CommonModule,
    TabViewModule ,
    RoleComponent,
    PermissionAssignComponent,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccessControlModule { }



