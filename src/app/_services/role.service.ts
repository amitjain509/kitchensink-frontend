import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { Role } from '../_models/role.model';
import { BaseService } from './base.service';


@Injectable({ providedIn: 'root' })
export class RoleService extends BaseService {
    private apiUrl = environment.apiUrl;

    createRole(role: Role) {
        return this.post<Role>(`${this.apiUrl}/roles`, role);
    }


    deleteRole(role: Role) {
        return this.delete(`${this.apiUrl}/roles/${role.roleId}`);
    }

    getAllRoles() {
        return this.get<Role[]>(`${this.apiUrl}/roles`);
    }

    getRoleById(roleId: string) {
        return this.get<Role>(`${this.apiUrl}/roles/${roleId}`);
    }

    assignPermissions(roleId:string, permissions: string[]) {
        return this.put(`${this.apiUrl}/roles/${roleId}/assign-permissions`, {
            roleId: roleId,
            permissions: permissions
        });
    }
}