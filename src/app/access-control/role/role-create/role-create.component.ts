import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../_models/role.model';
import { RoleService } from '../../../_services/role.service';
import { ToastService } from '../../../shared/services';
import { RoleComponent } from '../role.component';
import { finalize } from 'rxjs';
import { CommonModule, NgIf, TitleCasePipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-role-create',
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    Button,
    ReactiveFormsModule,
    NgIf,
    InputText
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.scss'
})
export class RoleCreateComponent {
  roleForm: FormGroup;

  submitted: boolean;
  loading: boolean;


  @Input()
  role: null | Role;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private toastService: ToastService,
    private roleComponent: RoleComponent,
  ) {
    this.submitted = false;
    this.loading = false;
    this.role = null;

    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      roleDescription: ['']
    });
  }

  ngOnInit(): void {
    if (this.role) {
      this.roleForm.reset(this.role);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.roleForm.invalid) {
      return;
    }

    const payload = this.roleForm.getRawValue();


    this.roleService.createRole(payload).pipe(
      finalize(() => {
        this.loading = false;
        this.roleForm.enable();
      })).subscribe({
        next: response => {
          const roles = this.roleComponent.role$.getValue();

          roles.push(response);
          this.roleComponent.role$.next([...roles]);
          this.toastService.success(`Role created successfully`);
          this.onClose.emit();
        },
        error: response => {
          const message =
            response['debug-message'] || `User creation failed`;
          this.toastService.error(new TitleCasePipe().transform(message));
        }
      });
  }
}
