import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoDataComponent } from '../shared/components/no-data/no-data.component';
import { RepeatDirective } from '../shared/directives/repeat.directive';
import { AuthService } from '../_services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Drawer } from 'primeng/drawer';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { BehaviorSubject, finalize } from 'rxjs';
import { Role } from '../_models/role.model';
import { RoleService } from '../_services/role.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../shared/services';
import { UserCreateComponent } from "./user-create/user-create.component";

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    SelectModule,
    TagModule,
    AsyncPipe,
    Button,
    Drawer,
    ToggleSwitchModule,
    // NgIf,
    Card,
    RouterLink,
    RepeatDirective,
    Skeleton,
    NoDataComponent,
    UserCreateComponent
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, AfterViewInit {
  public showDrawer: boolean;
  

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  roles!: Role[];
  permissions: string[] = [];

  selectedRole: Role | null = null;
  selectedUser: User | null = null;
  isEditMode = false;

  dataSource: any;
  users!: User[];
  editingIndex: number | null = null;

  userType: any;
  searchControl = new FormControl('');

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private roleService: RoleService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {
    this.showDrawer = false;
    this.selectedRole = null;

    this.permissions = this.authService.getUserPermissions();

    // Subscribe to search input changes
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value || '');
    });
  }

  ngOnInit(): void {
    this.userType = 'USER';
    this.loadUsers('USER');
    this.loadRoles();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const searchStr = filter.toLowerCase();
      return data.name.toLowerCase().includes(searchStr) ||
        data.email.toLowerCase().includes(searchStr) ||
        (data.phoneNumber && data.phoneNumber.toLowerCase().includes(searchStr));
    };
  }

  loadUsers(userType: string) {
    this.loading$.next(true);

    this.userService.getAllUsers(userType)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe(response => {
        this.user$.next(response);
      });
    // this.userService.getAllUsers(userType).subscribe(res => {
    //   this.users = res;

    //   // Reapply filter predicate after data load
    //   this.dataSource.filterPredicate = (data: User, filter: string) => {
    //     const searchStr = filter.toLowerCase();
    //     return data.name.toLowerCase().includes(searchStr) || 
    //            data.email.toLowerCase().includes(searchStr) || 
    //            (data.phoneNumber && data.phoneNumber.toLowerCase().includes(searchStr));
    //   };
    // });
  }

  private loadRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDrawerClose() {
    this.showDrawer = false;
    this.selectedUser = null;
    this.selectedRole = null;
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.isEditMode = true; // Enable edit mode
    this.showDrawer = true;
    this.selectedRole = user.roles[0]
  }

  cancelEdit() {
    this.isEditMode = false;
    this.showDrawer = false;
    this.editingIndex = null;
    this.selectedUser = null;
    this.selectedRole = null;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this._deleteUser(user)
    });
  }

  _deleteUser(user: User) {
    this.userService.deleteUser(user.userId).subscribe({
      next: () => {
        this.loadUsers(this.userType);
        this.toastService.success('User deleted successfully');
      },
      error: () => this.toastService.success('Failed to delete user')
    });
  }

  blockUnblockUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to update this user detail?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this._blockUnblockUser(user),
      reject: () => user.active = !user.active
    });
  }

  _blockUnblockUser(user: User) {
    if (!user.active) {
      this.userService.lockUser(user.userId)
        .subscribe({
          next: () => {
            this.toastService.success('User updated successfully');
          },
          error: () => this.toastService.success('Failed to update user')
        });
    } else {
      this.userService.unlockUser(user.userId).subscribe({
        next: () => {
          this.toastService.success('User updated successfully');
        },
        error: () => this.toastService.success('Failed to update user')
      });
    }

  }

  resetPassword(user: User) {
    if (user) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to reset user password?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this._expirePassword(user.email)
      });
    }
  }

  _expirePassword(email: string) {
    this.authService.expirePassword(email).subscribe({
      next: () => {
        this.toastService.success('Password reset done successfully');
      },
      error: () => this.toastService.success('Failed to reset your password')
    });;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
