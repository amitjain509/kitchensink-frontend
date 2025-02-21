import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { find } from 'lodash-es';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { finalize, iif } from 'rxjs';
import { Course } from '../../../shared/models';
import { CourseService, DataService, ToastService } from '../../../shared/services';

@Component({
  selector: 'app-add-edit-course',
  imports: [Button, ReactiveFormsModule, NgIf, InputText],
  templateUrl: './add-edit-course.component.html',
  styleUrl: './add-edit-course.component.scss'
})
export class AddEditCourseComponent implements OnInit {
  @Input()
  course: null | Course;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  submitted: boolean;
  myForm: FormGroup;
  loading: boolean;

  public fb: FormBuilder = inject(FormBuilder);
  public dataService: DataService = inject(DataService);
  public courseService: CourseService = inject(CourseService);
  public toastService: ToastService = inject(ToastService);

  constructor() {
    this.submitted = false;
    this.loading = false;
    this.course = null;
    this.myForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      timezone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.course) {
      this.myForm.reset(this.course);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    const payload: Course = this.myForm.getRawValue();

    const request = iif(
      () => !!payload.id,
      this.courseService.updateCourse(payload.id, payload),
      this.courseService.createCourse(payload)
    );

    this.myForm.disable();
    this.loading = true;
    request
      .pipe(
        finalize(() => {
          this.loading = false;
          this.myForm.enable();
        })
      )
      .subscribe({
        next: response => {
          const courses = this.dataService.course$.getValue();
          if (!!payload.id) {
            const course = find(courses, ['id', payload.id]);
            if (course) {
              Object.assign(course, response);
            }
            this.dataService.course$.next([...courses]);
          } else {
            courses.push(response);
          }
          this.dataService.course$.next([...courses]);
          this.toastService.success(`Course ${!!payload.id ? 'updated' : 'created'} successfully`);
          this.onClose.emit();
        },
        error: response => {
          const message =
            response['debug-message'] || `Course ${!!payload.id ? 'updation' : 'creation'} failed`;
          this.toastService.error(new TitleCasePipe().transform(message));
        }
      });
  }
}
