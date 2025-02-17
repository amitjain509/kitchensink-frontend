import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RoleService } from '../_services/role.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Role } from '../_models/role.model';
import { PermissionService } from '../_services/permission.service';
import { Permission } from '../_models/permission.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-role-permission-assign',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule
  ],
  templateUrl: './role-permission-assign.component.html',
  styleUrl: './role-permission-assign.component.css'
})
export class RolePermissionAssignComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['permissionName', 'isAssigned'];
  dataSource = new MatTableDataSource<any>();
  editingIndex: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  rolePermissionForm!: FormGroup;
  roles!: Role[];
  allPermissions!: Permission[];
  selectedRole: string | null = null;
  permissionsArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private dialog: MatDialog,
  ) {
    this.permissionsArray = this.fb.array([]);
  }

  ngOnInit(): void {
    this.rolePermissionForm = this.fb.group({
      role: ['', []],
      permissions: this.fb.array([]),
      isAssigned: [''],
      roles: ['']
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.permissionsArray = this.rolePermissionForm.get('permissions') as FormArray;
    this.loadRoles();
    this.loadPermissions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        this.showErrorDialog('Error fetching roles');
      }
    );
  }

  onRoleChange(roleId: string): void {
    this.selectedRole = roleId;
    this.updateCheckedPermissions(roleId);
  }

  updateCheckedPermissions(roleId: string): void {
    this.roleService.getRoleById(roleId).subscribe(
      (role) => {
        const assignedPermissions = role ? role.permissions.map(p => p.id) : [];
        this.allPermissions.forEach((permission, index) => {
          this.permissionsArray.controls[index].setValue(assignedPermissions.includes(permission.id), { emitEvent: false });
        });
      },
      (error) => {
        this.showErrorDialog('Error fetching permissions');
      }
    );

    this.dataSource = new MatTableDataSource(this.allPermissions);
    this.dataSource.paginator = this.paginator;  // Add this
    this.dataSource.sort = this.sort;
    // Initially display all permissions
    this.initializePermissionsArray();
  }

  loadPermissions() {
    this.permissionService.getAllPermissions().subscribe(
      (permissions) => {
        this.allPermissions = permissions;
        // Initially display all permissions
        this.initializePermissionsArray();
      },
      (error) => {
        this.showErrorDialog('Error fetching permissions');
      }
    );
  }

  initializePermissionsArray(): void {
    if (!this.permissionsArray) {
      this.permissionsArray = this.fb.array([]);
      this.rolePermissionForm.setControl('permissions', this.permissionsArray);
    }

    this.permissionsArray.clear();

    setTimeout(() => { // Ensures change detection completes before modifying the array
      this.allPermissions.forEach(() => {
        this.permissionsArray.push(new FormControl(false)); // Default to unchecked
      });
    });
  }

  linkPermission() {
    if (!this.selectedRole) {
      console.warn("No role selected!");
      return;
    }

    const assignedPermissionNames = this.permissionsArray.controls
      .map((control, index) => ({
        name: this.dataSource.data[index].name,
        assigned: control.value
      }))
      .filter(permission => permission.assigned) // Keep only assigned permissions
      .map(permission => permission.name); // Extract only the names


    // Call API to save the updated permissions
    this.roleService.assignPermissions(this.selectedRole, assignedPermissionNames).subscribe(
      response => {
        console.log("Permissions updated successfully", response);
      },
      error => {
        console.error("Error updating permissions", error);
        this.showErrorDialog(error);
      }
    );
  }

  onCheckboxChange(index: number): void {
    this.dataSource.data[index].isAssigned = this.permissionsArray.controls[index].value;
  }

  // Show error popup using MatDialog
  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message: errorMessage
      }
    });
  }
}
