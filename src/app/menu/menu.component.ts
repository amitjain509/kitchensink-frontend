import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  permissions: string[] = [];
  
  constructor(private router: Router, private authService: AuthService) {
    this.permissions = this.authService.getUserPermissions();
  }

  logout() {
    sessionStorage.clear(); // Clear session
    this.router.navigate(['/login']);   // Redirect to login page
  }

  navigateToUsers(userType: string) {
    this.router.navigate(['/menu/users', userType]);
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  isAccessControlExpanded(): boolean {
    return this.isRouteActive('roles') || this.isRouteActive('permission-assign');
  }
}
