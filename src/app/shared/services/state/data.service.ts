import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Course } from '../../models';
import { CourseService } from '../apis/course.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  course$: BehaviorSubject<Array<Course>> = new BehaviorSubject<Array<Course>>([]);

  courseService: CourseService = inject(CourseService);

  loadCourse(): void {
    this.loading$.next(true);
    this.courseService
      .getCourses()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe(response => {
        this.course$.next(response);
      });
  }
}
