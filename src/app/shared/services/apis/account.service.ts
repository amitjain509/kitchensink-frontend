import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpClient: HttpClient = inject(HttpClient);

  public getAccountDetails(): Observable<any> {
    return this.httpClient.get<any>('api/account');
  }
}
