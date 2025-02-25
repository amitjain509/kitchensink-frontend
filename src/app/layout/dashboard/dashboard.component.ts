import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Avatar } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    Card,
    Avatar
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userData: User | null = null;
  isEditingName = false;
  isEditingPhone = false;
  permissions: string[] = [];

  editMode = {
    name: false,
    phoneNumber: false,
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService) {
      
  }

  ngOnInit() {
    this.permissions = this.authService.getUserPermissions();
    this._loadUser();
  }

  toggleEdit(field: string) {
    if (field === 'name') {
      if (this.isEditingName) {
        this.saveEdit('name');
      }
      this.isEditingName = !this.isEditingName;
    } else if (field === 'phoneNumber') {
      if (this.isEditingPhone) {
        this.saveEdit('phoneNumber');
      }
      this.isEditingPhone = !this.isEditingPhone;
    }
  }


  saveEdit(field: 'name' | 'phoneNumber') {
    if (!this.userData) {
      return;
    }
    
    this.userData.roleId = this.userData?.roles[0].roleId;
    this.userService.updateUser(this.userData)
      .subscribe({
        next: response => {
          this.userData = response;
          this.editMode[field] = false;
          this.toastService.success(`User updated successfully`);
        },
        error: response => {
          this.toastService.error(new TitleCasePipe().transform(response.message));
        }
      });;
  }

  _loadUser() {
    this.userService.getUserByEmail(localStorage.getItem('email') ?? '')
      .subscribe({
        next: res => {
          this.userData = res;
        }
      });
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
