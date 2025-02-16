import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError } from 'rxjs';
import { BaseService } from './base.service';
import { Password } from '../_models/password.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
    private apiUrl = environment.apiUrl;

    resetPassword(userId: string, password: Password) {
        return this.patch(`${this.apiUrl}/users/${userId}`, password).pipe(
            catchError(this.handleError)
        );
    }


    assignRole(userId: string, roles: string[]) {
        return this.patch(`${this.apiUrl}/users/${userId}`, roles).pipe(
            catchError(this.handleError)
        );
    }

    login(email: string, password: string) {
        return this.post(`${this.apiUrl}/auth`, {
            params: { email, password }
        }).pipe(
            catchError(this.handleError)
        );
    }
}