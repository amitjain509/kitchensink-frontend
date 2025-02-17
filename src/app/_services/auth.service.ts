import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError, of } from 'rxjs';
import { BaseService } from './base.service';
import { Password } from '../_models/password.model';
import { UserData } from '../_models/userData.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
    private apiUrl = environment.apiUrl;

    resetPassword(password: Password) {
        return this.post(`${this.apiUrl}/auth/reset-password`, password).pipe(
            catchError(this.handleError)
        );
    }


    assignRole(userId: string, roles: string[]) {
        return this.patch(`${this.apiUrl}/users/${userId}`, roles).pipe(
            catchError(this.handleError)
        );
    }

    login(email: string, password: string) {
        return this.post<UserData>(`${this.apiUrl}/auth/login`, {
            email: email, password: password
        }).pipe(
            catchError(this.handleError)
        );
    }

    getUserPermissions(): string[] {
        const token = sessionStorage.getItem('token');
        if (!token) return [];

        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        return payload.permissions || [];
    }

    isAuthenticated(): boolean {
        // Check if the session token exists in sessionStorage
        return !!sessionStorage.getItem('token');
      }

    getToken() {
        return sessionStorage.getItem('token');
    }
}