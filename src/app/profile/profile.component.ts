import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  form!: FormGroup;
  isLoading!: false;

  userData!: any;

  constructor() {
    this.loadUSerInfo();
  }

  loadUSerInfo() {
    this.userData = {
      email: sessionStorage.getItem('email'),
      name: sessionStorage.getItem('email'),
      userType:sessionStorage.getItem('userType')
    }
  }
}
