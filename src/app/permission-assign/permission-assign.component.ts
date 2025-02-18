import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PermissionTableData } from '../_models/permission-table.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Role } from '../_models/role.model';
import { RoleService } from '../_services/role.service';
import { PermissionService } from '../_services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from '../_models/permission.model';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-permission-assign',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,  
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './permission-assign.component.html',
  styleUrl: './permission-assign.component.css'
})
export class PermissionAssignComponent implements OnInit, AfterViewInit {
  roles!: Role[];
  selectedRole: string | null = null;
  permissionsTableData!: PermissionTableData[];

  displayedColumns: string[] = ['permissionName', 'select'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<PermissionTableData>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private dialog: MatDialog,
  ) {
    
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    this.loadRoles();
    this.loadPermissions();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  toggleSelection(row: PermissionTableData) {
    this.selection.toggle(row);
    const permission = this.permissionsTableData.find(p => p.id === row.id);
    if (permission) {
      permission.isAssigned = this.selection.isSelected(row);
    }
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
    this.roleService.getRoleById(roleId).subscribe(role => {
      const assignedPermissions = new Set(role?.permissions.map(p => p.id) || []);
      this.permissionsTableData.forEach(p => p.isAssigned = assignedPermissions.has(p.id));
      this.updateSelection();
    });
  }

  loadPermissions() {
    this.permissionService.getAllPermissions().subscribe(
      (permissions) => {
        this.permissionsTableData = this.transformPermissions(permissions);
        this.dataSource.data = this.permissionsTableData;
        this.updateSelection()
      },
      (error) => {
        this.showErrorDialog('Error fetching permissions');
      }
    );
  }


  transformPermissions(permissions: Permission[]): PermissionTableData[] {
    return permissions.map(permission => ({
      permissionName: permission.name, // Map `name` to `permissionName`
      isAssigned: false, // Default value for isAssigned
      id: permission.id
    }));
  }

  updateSelection() {
    this.selection.clear();
    this.permissionsTableData.forEach(permission => {
      if (permission.isAssigned) {
        this.selection.select(permission);
      }
    });
  }

  savePermission() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: `Are you sure you want to save permissions?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.linkPermission();
      }
    });
  }

  linkPermission() {
    if (!this.selectedRole) {
      console.warn("No role selected!");
      return;
    }

    const assignedPermissionNames = this.selection.selected.map(p => p.permissionName);

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

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message: errorMessage
      }
    });
  }
}
