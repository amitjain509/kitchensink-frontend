
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { BaseService } from './base.service';
import { User } from '../_models/user.model';


@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
    private apiUrl = environment.apiUrl;

    createUser(user: User) {
        return this.post<User>(`${this.apiUrl}/users`, user);
    }

    updateUser(user: User) {
        return this.put<User>(`${this.apiUrl}/users`, user);
    }

    deleteUser(userId: string) {
        return this.delete<User>(`${this.apiUrl}/users/${userId}`);
    }

    getUserByEmail(email: string) {
        return this.get(`${this.apiUrl}/users/${email}`);
    }

    getAllUsers(userType: string) {
        return this.get<User[]>(`${this.apiUrl}/users/userType/${userType}`);
    }

    lockUser(userId: string) {
        return this.patch(`${this.apiUrl}/users/${userId}/lock`, null);
    }

    unlockUser(userId: string) {
        return this.patch(`${this.apiUrl}/users/${userId}/unlock`, null);
    }
}