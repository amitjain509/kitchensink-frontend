import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { environment } from '../../environment/environment';
import { catchError, map, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MemberService {
    private apiUrl = environment.apiUrl;
    http!: HttpClient;

    constructor() {
        this.http = inject(HttpClient);
    }

    getAllMembers() {
        return this.http.get<Member[]>(`${this.apiUrl}/members/all`, { headers: this.getHeaders() }).pipe(
            catchError(this.handleError)
        );
    }

    getMemberByEmail(email: any) {
        return this.http.get<Member>(`${this.apiUrl}/members`, 
        { 
            headers: this.getHeaders() ,
            params: { email }
        }).pipe(
            map((member: Member) => [member]),
            catchError(this.handleError)
        );
    }

    deleteMember(email: string) {
        return this.http.delete(`${this.apiUrl}/members/delete`, {
            headers: this.getHeaders(),
            params: { email } // Sends as query parameter
        }).pipe(
            catchError(this.handleError)
        );
    }

    editMember(member: Member) {
        return this.http.put(`${this.apiUrl}/members/update/${member.email}`, member, { headers: this.getHeaders() }).pipe(
            catchError(this.handleError)
        );
    }

    public isAuthenticated(): boolean {
        return this.getToken() != null
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error); // Return only the error object
    }

    private getToken(): string | null {
        return localStorage.getItem('token'); // Assuming token is stored in localStorage
    }

    private getHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }
}