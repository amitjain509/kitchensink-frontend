import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {}

  // Generic GET request
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  // Generic POST request
  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data).pipe(catchError(this.handleError));
  }

  // Generic PUT request
  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data).pipe(catchError(this.handleError));
  }

  // Generic PUT request
  patch<T>(url: string, data: any): Observable<T> {
    return this.http.patch<T>(url, data).pipe(catchError(this.handleError));
  }

  // Generic DELETE request
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url).pipe(catchError(this.handleError));
  }

  // Error handling
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while processing the request.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
