import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../_models/role.model';
import { RoleService } from '../../_services/role.service';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { finalize, iif } from 'rxjs';
import { find } from 'lodash-es';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { UserComponent } from '../user.component';
import { ToastService } from '../../shared/services';
import { CommonModule, NgIf, TitleCasePipe } from '@angular/common';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-user-create',
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    Button,
    ReactiveFormsModule,
    NgIf,
    InputText
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  userForm: FormGroup;
  roles!: Role[];

  submitted: boolean;
  loading: boolean;
  selectedRole!: Role;

  @Input()
  user: null | User;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private toastService: ToastService,
    private userComponent: UserComponent,
  ) {
    this.submitted = false;
    this.loading = false;
    this.user = null;

    this.userForm = this.fb.group({
      userId: [null],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-z][a-z]*(\\s[A-Za-z][a-z]*)*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^([\\s-]?)?[6-9]\\d{9}$')]],
      selectedRole: ['', [Validators.required]]
    });

    this.loadRoles();
  }
  
  ngOnInit(): void {
    if (this.user) {
      this.userForm.reset(this.user);
    }
  }

  private loadRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();
      return;
    }

    const payload: User = this.userForm.getRawValue();

    this.userForm.disable();
    this.loading = true;
    payload.role = this.selectedRole.roleId;
    payload.userType = 'USER'

    const request = iif(
      () => !!payload.userId,
      this.userService.updateUser(payload),
      this.userService.createUser(payload)
    );

    request.pipe(
      finalize(() => {
        this.loading = false;
        this.userForm.enable();
      }))
      .subscribe({
        next: response => {
          const users = this.userComponent.user$.getValue();
          if (!!payload.userId) {
            const user = find(users, ['userId', payload.userId]);
            if (user) {
              Object.assign(user, response);
            }
            this.userComponent.user$.next([...users]);
          } else {
            users.push(response);
          }
          this.userComponent.user$.next([...users]);
          this.toastService.success(`User ${!!payload.userId ? 'updated' : 'created'} successfully`);
          this.onClose.emit();
        },
        error: response => {
          const message =
            response['debug-message'] || `User ${!!payload.userId ? 'updation' : 'creation'} failed`;
          this.toastService.error(new TitleCasePipe().transform(message));
        }
      });;
  }
}
