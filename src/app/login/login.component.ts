import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    backendErrors: any = {};
    loginType = 'user'

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            identifier: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    onSubmit(): void {
        this.submitted = true;

        if (this.loginForm.invalid) {
            console.log('Form Invalid');
            return;
        }


        if (this.loginForm.valid) {
            const formValue = this.loginForm.value;

            const memberData: Member = {
                name: '',
                email: formValue.identifier ?? '',
                phoneNumber: formValue.identifier ?? '',
                password: formValue.password ?? '',
                isEditing: false,
                roles: []
            };

            this.authService.login(memberData).subscribe({
                next: (res) => {
                    console.log('Login successful', res);
                    const roles: string[] = res.roles || [];
                    this.backendErrors = {};
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('loggedInEmail', res.email)
                    if(roles.includes('ADMIN')) {
                        localStorage.setItem('role', 'ADMIN')
                        this.router.navigate(['/admin'])
                    } else {
                        this.router.navigate(['/home'])
                    }
                },
                error: (err) => {
                    console.error('Registration error:', err);
                    this.backendErrors = err;
                }
            });
        }
    }

    toggleLoginMode(type:string) {
        this.loginType = type;
    }

    get emailControl() {
        return this.loginForm.get('email');
    }

    get phoneControl() {
        return this.loginForm.get('phoneNumber');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
