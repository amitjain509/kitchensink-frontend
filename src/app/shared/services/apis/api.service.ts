import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthModel } from '../../models';
import { UserData } from '../../../_models/userData.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);

  auth(payload: AuthModel): Observable<UserData> {
    return this.httpClient.post<UserData>('/auth/login', payload);
  }
}
