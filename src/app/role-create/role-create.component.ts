import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RoleService } from '../_services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatOptionModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css',
})
export class RoleCreateComponent {
  roleForm: FormGroup;
  dialogTitle: any;

  constructor(
    private fb: FormBuilder, 
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RoleCreateComponent>
    ) {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      roleDescription: ['']
    });
  }

  addRole() {
    if (this.roleForm.valid) {
      const roleData = this.roleForm.value;

      this.roleService.createRole(roleData).subscribe(
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
