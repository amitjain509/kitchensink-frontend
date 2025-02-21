import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { finalize } from 'rxjs';
import { ToastService } from '../../shared/services';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  imports: [Button, InputText, Password, ReactiveFormsModule, RouterLink, Message, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  submitted: boolean;
  loading: boolean;
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _api: AuthService,
    private _toastService: ToastService
  ) {
    this.submitted = false;
    this.loading = false;
    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.disable();
    const payload = this.loginForm.getRawValue();

    this.loading = true;
    this._api
      .auth(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name);
          localStorage.setItem('permissions', JSON.stringify(res.permissions));
          if (res.passwordResetRequired) {
            this._router.navigate(['/reset-password']);
          } else {
            this._router.navigate(['/admin/access-control']);
          }
        },
        error: err => {
          if (err.status === 401) {
            this._toastService.error(
              'Invalid Credentials',
              'Please check your email and password and try again'
            );
          }
          this.loginForm.enable();
        }
      });
  }
}
