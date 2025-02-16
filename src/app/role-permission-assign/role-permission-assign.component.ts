import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RoleService } from '../_services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-role-permission-assign',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './role-permission-assign.component.html',
  styleUrl: './role-permission-assign.component.css'
})
export class RolePermissionAssignComponent {
  rolePermissionForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RolePermissionAssignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.rolePermissionForm = this.fb.group({
        roleName: [{ value: this.data?.roleName || '', disabled: true }],
        roleDescription: [{ value: this.data?.roleDescription ?? 'AUTO_GENERATED', disabled: true }]
      });
  }

  linkPermission() {
    if (this.rolePermissionForm.valid) {
      const roleData = this.rolePermissionForm.value;

      this.roleService.delete(roleData).subscribe(
        (response) => {
          // Handle successful response
          this.dialogRef.close(true);
          this.snackBar.open('Role created successfully!', 'Close', { duration: 3000 });
        },
        (error) => {
          // Show error popup if an error occurs
          this.showErrorDialog(error);
        }
      );
    }
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
