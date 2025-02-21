
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { BaseService } from './base.service';
import { User } from '../_models/user.model';


@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
    private apiUrl = environment.apiUrl;

    createUser(user: User) {
        return this.post<User>(`${this.apiUrl}/users`, user).pipe(
            catchError(this.handleError)
        );
    }

    updateUser(user: User) {
        return this.put<User>(`${this.apiUrl}/users`, user).pipe(
            catchError(this.handleError)
        );
    }

    deleteUser(userId: string) {
        return this.delete<User>(`${this.apiUrl}/users/${userId}`).pipe(
            catchError(this.handleError)
        );
    }

    getUserByEmail(email: string) {
        return this.get(`${this.apiUrl}/users/${email}`).pipe(
            catchError(this.handleError)
        );
    }

    getAllUsers(userType: string) {
        return this.get<User[]>(`${this.apiUrl}/users/userType/${userType}`).pipe(
            catchError(this.handleError)
        );
    }

    lockUser(userId: string) {
        return this.patch(`${this.apiUrl}/users/${userId}/lock`, null).pipe(
            catchError(this.handleError)
        );
    }

    unlockUser(userId: string) {
        return this.patch(`${this.apiUrl}/users/${userId}/unlock`, null).pipe(
            catchError(this.handleError)
        );
    }
}