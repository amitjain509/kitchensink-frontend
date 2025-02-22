import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Avatar } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  editMode = {
    name: false,
    phoneNumber: false,
  };

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this._loadUser();
  }

  toggleEdit(field: 'name' | 'phoneNumber') {
    this.editMode[field] = !this.editMode[field];
  }

  saveEdit(field: 'name' | 'phoneNumber') {
    this.editMode[field] = false; // Exit edit mode after saving
  }

  saveUserData() {
    console.log("Updated User Data:", this.userData);
    // Implement API call here to save the updated user data
  }

  _loadUser() {
    this.userService.getUserByEmail(localStorage.getItem('email') ?? '')
      .subscribe({
        next: res => {
          this.userData = res;
        }
      });
  }
}
