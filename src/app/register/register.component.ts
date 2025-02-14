import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MemberService } from '../_services/member.service';
import { Member } from '../_models/member';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import required modules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^(\\+91[\\s-]?)?[6-9]\\d{9}$')
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });

  backendErrors: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {

    if (this.registerForm.invalid) {
      console.log('Form Invalid');
      return;
    }


    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const memberData: Member = {
        name: formValue.name ?? '',
        email: formValue.email ?? '',
        phoneNumber: formValue.phoneNumber ?? '',
        password: formValue.password ?? '',
        isEditing: false,
        roles: []
      };

      this.authService.registerMember(memberData).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.backendErrors = {}; // Clear errors on success
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.backendErrors = err; // Store backend errors
        }
      });
    }
  }

  get nameControl() {
    return this.registerForm.get('name');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get phoneControl() {
    return this.registerForm.get('phoneNumber');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
