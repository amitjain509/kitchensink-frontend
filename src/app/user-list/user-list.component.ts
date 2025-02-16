import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { MatButtonModule } from "@angular/material/button"
import { MatBadgeModule } from "@angular/material/badge"
import { MatCardModule } from "@angular/material/card"
import { MatSliderModule } from "@angular/material/slider"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatRadioModule } from "@angular/material/radio"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatMenuModule } from "@angular/material/menu"
import { MatIconModule } from "@angular/material/icon"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatListModule } from "@angular/material/list"
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';
import { UserCreateComponent } from '../user-create/user-create.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'active', 'actions'];
  dataSource: any;
  users!: User[];
  editingIndex: number | null = null;
  editForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addUser() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: "30%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUsers();
    });
  }

  editUser(index: number, user: User) {
    this.editingIndex = index;
    this.editForm.setValue({
      name: user.name,
      email: user.email
    });
  }

  saveUser(index: number) {
    if (this.editForm.valid) {
      const updatedUser = { ...this.users[index], ...this.editForm.value };

      this.userService.updateUser(updatedUser).subscribe({
        next: (response) => {
          this.users[index] = response; // Update UI with the saved data from the backend
          this.editingIndex = null;
          this.loadUsers();
          console.log("User updated successfully:", response);
        },
        error: (err) => {
          console.error("Error updating user:", err);
        }
      });
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteUser(user: User) {
    console.log("Delete User:", user);
  }
}
