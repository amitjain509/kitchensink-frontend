import { Component } from '@angular/core';
import { Role } from '../../_models/role.model';
import { RoleService } from '../../_services/role.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../shared/services';
import { BehaviorSubject, finalize } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { NoDataComponent } from '../../shared/components/no-data/no-data.component';
import { Drawer } from 'primeng/drawer';
import { RoleCreateComponent } from "./role-create/role-create.component";
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-role',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    SelectModule,
    TagModule,
    AsyncPipe,
    Button,
    Drawer,
    Card,
    Skeleton,
    NoDataComponent,
    ToggleSwitchModule,
    ReactiveFormsModule,
    RoleCreateComponent
],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  role$: BehaviorSubject<Array<Role>> = new BehaviorSubject<Array<Role>>([]);
  permissions: string[] = [];
  public showDrawer: boolean;

  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService) {
    this.showDrawer = false;
  }

  ngOnInit(): void {
    this.permissions = this.authService.getUserPermissions();
    this.loadRoles();
  }

  onDrawerClose() {
    this.showDrawer = false;
  }

  cancelEdit() {
    this.showDrawer = false;
  }

  loadRoles() {
    this.roleService.getAllRoles()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe(response => {
        this.role$.next(response);
      });
  }

  deleteRole(role: Role) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this role?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this._deleteRole(role)
    });
  }

  _deleteRole(role: Role) {
    this.roleService.deleteRole(role).subscribe({
      next: () => {
        this.loadRoles();
        this.toastService.success('Role deleted successfully');
      },
      error: () => this.toastService.success('Failed to delete role')
    });
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
