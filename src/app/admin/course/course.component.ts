import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { remove } from 'lodash-es';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Drawer } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';
import { NoDataComponent } from '../../shared/components/no-data/no-data.component';
import { RepeatDirective } from '../../shared/directives/repeat.directive';
import { Course } from '../../shared/models';
import {
  ConfirmationService,
  CourseService,
  DataService,
  ToastService
} from '../../shared/services';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';

@Component({
  selector: 'app-course',
  imports: [
    TableModule,
    AsyncPipe,
    Button,
    Drawer,
    ReactiveFormsModule,
    AddEditCourseComponent,
    NgIf,
    Card,
    RouterLink,
    RepeatDirective,
    Skeleton,
    NoDataComponent
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
  public showDrawer: boolean;

  public confirmationService: ConfirmationService = inject(ConfirmationService);
  public courseService: CourseService = inject(CourseService);
  public dataService: DataService = inject(DataService);
  public toastService: ToastService = inject(ToastService);
  public selectedCourse: null | Course;

  constructor() {
    this.showDrawer = false;
    this.selectedCourse = null;
  }

  ngOnInit() {
    this.dataService.loadCourse();
  }

  editCourse(course: Course): void {
    this.selectedCourse = course;
    this.showDrawer = true;
  }

  onDelete(course: Course): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this course?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this._deleteCourse(course)
    });
  }

  onDrawerClose() {
    this.showDrawer = false;
    this.selectedCourse = null;
  }

  private _deleteCourse(course: Course): void {
    course.loading = true;
    this.courseService
      .removeCourses(course.id)
      .pipe(finalize(() => (course.loading = false)))
      .subscribe({
        next: () => {
          const courses = this.dataService.course$.getValue();
          remove(courses, ['id', course.id]);
          this.dataService.course$.next([...courses]);
          this.toastService.success('Course deleted successfully');
        },
        error: () => this.toastService.success('Failed to deleted course')
      });
  }
}
