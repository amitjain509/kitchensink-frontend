import { Component } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { RoleService } from '../../_services/role.service';
import { ToastService } from '../../shared/services';
import { Role } from '../../_models/role.model';
import { SelectModule } from 'primeng/select';
import { AsyncPipe, CommonModule, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { Card } from 'primeng/card';
import { RepeatDirective } from '../../shared/directives/repeat.directive';
import { NoDataComponent } from '../../shared/components/no-data/no-data.component';
import { Skeleton } from 'primeng/skeleton';
import { PermissionService } from '../../_services/permission.service';
import { Permission } from '../../_models/permission.model';
import { PermissionTableData } from '../../_models/permission-table.model';
import { Checkbox } from 'primeng/checkbox';
import { find } from 'lodash-es';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-permission-assign',
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    TableModule,
    TagModule,
    AsyncPipe,
    // NgIf,
    Card,
    Skeleton,
    Checkbox,
    Button,
    RepeatDirective,
    NoDataComponent
  ],
  templateUrl: './permission-assign.component.html',
  styleUrl: './permission-assign.component.scss'
})
export class PermissionAssignComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  permission$: BehaviorSubject<Array<PermissionTableData>> = new BehaviorSubject<Array<PermissionTableData>>([]);
  permissions!: Permission[];

  submitted: boolean;
  loading: boolean;

  public showDrawer: boolean;
  selectedRole!: Role;
  roles!: Role[];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService) {
    this.showDrawer = false;
    this.submitted = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles() {
    this.roleService.getAllRoles()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe(response => {
        this.roles = response
      });
  }

  loadPermissions() {
    this.permissionService.getAllPermissions().pipe(finalize(() => this.loading$.next(false)))
      .subscribe(response => {
        this.permissions = response;
        this.permission$.next(this.transformPermissions(response));
      });
  }

  transformPermissions(permissions: Permission[]): PermissionTableData[] {
    return permissions.map(permission => ({
      permissionName: permission.name, // Map `name` to `permissionName`
      isAssigned: false, // Default value for isAssigned
      id: permission.id
    }));
  }

  onRoleChange(): void {
    this.updateCheckedPermissions(this.selectedRole.roleId);
  }

  updateCheckedPermissions(roleId: string): void {
    this.roleService.getRoleById(roleId).subscribe(role => {
      const assignedPermissions = new Set(role?.permissions.map(p => p.name) || []);

      const updatedPermissions = this.permissions.map(permission => {
        return {
          permissionName: permission.name,
          id: permission.id,
          isAssigned: assignedPermissions.has(permission.name) // Check if permission exists
        };
      });
      this.permission$.next(updatedPermissions);
    });
  }

  onPermissionChange() {
    console.log(this.permission$.value.filter(p => p.isAssigned))
  }


  onSubmit() {
    this.submitted = true;
    this.confirmationService.confirm({
      message: 'Are you sure you want to update the permissions?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this._linkPermission()
    });
  }

  _linkPermission() {
    if (!this.selectedRole) {
      console.warn("No role selected!");
      return;
    }

    const assignedPermissionNames = this.permission$.value.filter(p => p.isAssigned).map(p => p.permissionName);

    // Call API to save the updated permissions
    this.roleService.assignPermissions(this.selectedRole.roleId, assignedPermissionNames).pipe(
      finalize(() => {
        this.loading = false;
        // this.roleForm.enable();
      })).subscribe({
        next: response => {
          this.toastService.success(`Permissions linked successfully`);
        },
        error: response => {
          const message =
            response['debug-message'] || `Permission linking failed`;
          this.toastService.error(new TitleCasePipe().transform(message));
        }
      });
  }
}
