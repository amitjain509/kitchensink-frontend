import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { BaseService } from './base.service';
import { Permission } from '../_models/permission.model';


@Injectable({ providedIn: 'root' })
export class PermissionService extends BaseService {
    private apiUrl = environment.apiUrl;

    getAllPermissions() {
        return this.get<Permission[]>(`${this.apiUrl}/permissions`);
    }
}