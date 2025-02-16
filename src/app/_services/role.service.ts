import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError } from 'rxjs';
import { Role } from '../_models/role.model';
import { BaseService } from './base.service';


@Injectable({ providedIn: 'root' })
export class RoleService extends BaseService {
    private apiUrl = environment.apiUrl;

    createRole(role: Role) {
        return this.post(`${this.apiUrl}/roles`, role).pipe(
            catchError(this.handleError)
        );
    }


    deleteRole(role: Role) {
        return this.delete(`${this.apiUrl}/roles/${role.roleId}`).pipe(
            catchError(this.handleError)
        );
    }

    getAllRoles() {
        return this.get<Role[]>(`${this.apiUrl}/roles`).pipe(
            catchError(this.handleError)
        );
    }
}