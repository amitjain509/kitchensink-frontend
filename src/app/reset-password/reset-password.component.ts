import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'reset-password',
  standalone: true,
  imports:[CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatOptionModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.resetPasswordForm = this.fb.group({
      email : [''],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      oldPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    return newPassword === confirmPassword ? null : { mismatch: true };
  }


  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const passwordData = this.resetPasswordForm.value;
      console.log('Resetting password with', passwordData);
      
      this.authService.resetPassword(passwordData.email, passwordData.newPassword)
        .subscribe(() => {
          alert('Password reset successful! Please log in.');
          this.router.navigate(['/login']);
        }, error => {
          console.error('Password reset failed', error);
          alert('Failed to reset password. Try again.');
        });
    }
  }
}
