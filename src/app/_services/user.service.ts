
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError } from 'rxjs';
import { BaseService } from './base.service';
import { User } from '../_models/user.model';


@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
    private apiUrl = environment.apiUrl;

    createUser(user: User) {
        return this.post(`${this.apiUrl}/users`, user).pipe(
            catchError(this.handleError)
        );
    }

    updateUser(user: User) {
        return this.put<User>(`${this.apiUrl}/users`, user).pipe(
            catchError(this.handleError)
        );
    }

    getUserByEmail(email: string) {
        return this.get(`${this.apiUrl}/${email}`).pipe(
            catchError(this.handleError)
        );
    }

    getAllUsers() {
        return this.get<User[]>(`${this.apiUrl}/users`).pipe(
            catchError(this.handleError)
        );
    }

    lockUser(userId: string) {
        return this.patch(`${this.apiUrl}/${userId}/lock`, null).pipe(
            catchError(this.handleError)
        );
    }

    unlockUser(userId: string) {
        return this.patch(`${this.apiUrl}/${userId}/unlock`, null).pipe(
            catchError(this.handleError)
        );
    }
}