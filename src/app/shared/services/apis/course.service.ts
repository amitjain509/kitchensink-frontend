import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Course } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly _baseUrl = '/api/courses';

  private readonly http: HttpClient = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this._baseUrl);
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this._baseUrl}/${id}`);
  }

  createCourse(payload: Course): Observable<Course> {
    return this.http.post<Course>(this._baseUrl, payload).pipe(delay(2000));
  }

  updateCourse(id: string, payload: Course): Observable<Course> {
    return this.http.put<Course>(`${this._baseUrl}/${id}`, payload);
  }

  removeCourses(id: string): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${id}`);
  }
}
