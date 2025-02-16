import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { RoleService } from '../_services/role.service';
import { Role } from '../_models/role.model';
import { RoleCreateComponent } from '../role-create/role-create.component';

@Component({
  selector: 'app-role-create',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
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
    RouterModule]
})
export class RoleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['roleName', 'roleDescription', 'actions'];
  dataSource: any;
  roles!: Role[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private roleService: RoleService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.loadRoles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe(res => {
      this.roles = res;
      this.dataSource = new MatTableDataSource<Role>(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addUser() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoleCreateComponent, {
      width: "30%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadRoles();
    });
  }

  deleteRole(role: Role) {
    this.roleService.deleteRole(role).subscribe(res => {
     this.loadRoles();
    });;
  }
}
