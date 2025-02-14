import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl;
    http!: HttpClient;

    constructor() {
        this.http = inject(HttpClient);
    }

    registerMember(member: Member): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/signup`, member).pipe(
            catchError(this.handleError)
        );
    }

    login(member: Member): Observable<any> {
        return this.http.post<{ token: string, email: string, roles: string[] }>(`${this.apiUrl}/auth/login`, member).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('email', response.email);
                localStorage.setItem('roles', JSON.stringify(response.roles)); // Store roles
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error); // Return only the error object
    }


    isAdmin(): boolean {
        return !!localStorage.getItem('role');
    }
}