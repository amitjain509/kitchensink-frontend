import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BaseService } from './base.service';
import { Password } from '../_models/password.model';
import { UserData } from '../_models/userData.model';
import { environment } from '../../environments/environment';
import { AuthModel } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
    private apiUrl = environment.apiUrl;

    resetPassword(password: Password) {
        return this.post(`${this.apiUrl}/auth/reset-password`, password).pipe(
            catchError(this.handleError)
        );
    }

    expirePassword(email: string) {
        return this.put(`${this.apiUrl}/auth/reset-password/${email}`, null).pipe(
            catchError(this.handleError)
        );
    }


    assignRole(userId: string, roles: string[]) {
        return this.patch(`${this.apiUrl}/users/${userId}`, roles).pipe(
            catchError(this.handleError)
        );
    }

    auth(payload: AuthModel): Observable<UserData> {
        return this.post<UserData>('/auth/login', payload);
    }

    getUserPermissions(): string[] {
        const token = localStorage.getItem('token');
        if (!token) return [];

        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        return payload.permissions || [];
    }

    isAuthenticated(): boolean {
        // Check if the session token exists in localStorage
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }
}