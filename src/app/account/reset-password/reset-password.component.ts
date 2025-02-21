import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { AuthService } from '../../_services/auth.service';
import { ToastService } from '../../shared/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [Button, Password, ReactiveFormsModule, Message, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  submitted: boolean;
  loading: boolean;
  resetForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _api: AuthService,
    private _toastService: ToastService
  ) {
    this.submitted = false;
    this.loading = false;
    this.resetForm = this._fb.group({
      email : [localStorage.getItem('email')],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      oldPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.resetForm.get('email')?.disable();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    return newPassword === confirmPassword ? null : { mismatch: true };
  }
  
  onSubmit(): void {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.resetForm.disable();
    const payload = this.resetForm.getRawValue();

    this.loading = true;
    this._api
      .resetPassword(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: res => {
          this._router.navigate(['/account/login']);
        }
      });
  }
}
