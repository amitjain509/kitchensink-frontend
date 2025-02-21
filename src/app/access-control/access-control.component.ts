import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { RoleComponent } from './role/role.component';
import { PermissionAssignComponent } from './permission-assign/permission-assign.component';

@Component({
  selector: 'app-access-control',
  imports: [
    TabViewModule,
    // RoleComponent,
    PermissionAssignComponent
],
  templateUrl: './access-control.component.html',
  styleUrl: './access-control.component.scss'
})
export class AccessControlComponent {
  activeIndex: number = 0;
}
