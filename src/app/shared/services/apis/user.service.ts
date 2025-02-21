import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  getUsers(pagination: PaginationParams): Observable<HttpResponse<User[]>> {
    let params = new HttpParams().set('page', pagination.first).set('size', pagination.rows);
    if (pagination.sortField) {
      params = params.set(
        'sort',
        `${pagination.sortField},${pagination.sortOrder === 1 ? 'asc' : 'desc'}`
      );
    }
    return this.http.get<User[]>('api/admin/users', { params, observe: 'response' });
  }

  activateDeactivateUser(id: string, activated: boolean): Observable<void> {
    if (activated) {
      return this.http.put<void>(`api/account/deactivate/${id}`, null);
    }
    return this.http.put<void>(`api/account/activate/${id}`, null);
  }

  resendInvite(id: string): Observable<void> {
    return this.http.post<void>(`api/resend-invite/${id}`, null);
  }

  public deleteUser(id: string) {
    return this.http.delete<void>(`api/admin/users/${id}`);
  }
}
