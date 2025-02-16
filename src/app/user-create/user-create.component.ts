import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../_services/role.service';
import { Role } from '../_models/role.model';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UserService } from '../_services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from '../_services/validator.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'
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

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(\\+91[\\s-]?)?[6-9]\\d{9}$')]],
      role: ['', []]
    });

    // Fetch roles when the component is initialized
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
      this.userService.createUser(userData).subscribe(
        (response) => {
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
