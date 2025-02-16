import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../_models/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      console.log('Logging in with', userData);
      
      this.authService.login(userData.email, userData.password)
        .subscribe(response => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('email', response.name);
          sessionStorage.setItem('permissions', JSON.stringify(response.permissions));
          
          if (response.passwordResetRequired) {
            this.router.navigate(['/reset-password']);
          } else {
            this.router.navigate(['/home']);
          }
        }, error => {
          console.error('Login failed', error);
          alert('Invalid username or password');
        });
    }
  }
}
