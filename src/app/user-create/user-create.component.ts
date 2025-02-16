import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../_services/role.service';
import { Role } from '../_models/role.model';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UserService } from '../_services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
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
  ]
})
export class UserCreateComponent {
  userForm: FormGroup;
  roles!: Role[];
  userTypes = ['MEMBER', 'USER'];
  dialogTitle: string = 'Add User';
  currentUserType!: string;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(\\+91[\\s-]?)?[6-9]\\d{9}$')]],
      role: ['', []]
    });

    if (this.data) {
      this.dialogTitle = this.data == 'MEMBER' ? 'Add Member' : 'Add User';
      this.currentUserType = this.data;
    }
    this.loadRoles();
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

  addUser(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      userData.userType = this.currentUserType;
      this.userService.createUser(userData).subscribe(
        (response) => {
          this.dialogRef.close(true);
          this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
        },
        (error) => {
          this.showErrorDialog('Error creating user');
        }
      );
    }
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, { data: { message } });
  }
}
