import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [Menu, Ripple, RouterLinkActive, RouterLink, PrimeTemplate],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  items: MenuItem[] | undefined;
  permissions: string[] = [];
  allowedItems: MenuItem[] | undefined;

  constructor(private authService: AuthService) {
    this.permissions = this.authService.getUserPermissions();
    this.items = [
      {
        permission: 'ALL',
        label: 'Roster',
        items: [
          {
            permission: 'ALL',
            label: 'Dashboard',
            icon: 'pi pi-home',
            route: '/main/dashboard'
          }
        ]
      },
      {
        permission: 'USER_VIEW',
        label: 'User Management',
        items: [
          {
            permission: 'USER_VIEW',
            label: 'Users',
            icon: 'pi pi-users',
            route: '/main/user'
          }
        ]
      },
      {
        permission: 'ROLE_VIEW',
        label: 'Access Management',
        items: [
          {
            permission: 'ROLE_VIEW',
            label: 'Roles',
            icon: 'pi pi-users',
            route: '/main/access-control/roles'
          },
          {
            permission: 'ROLE_VIEW',
            label: 'Permissions',
            icon: 'pi pi-wrench',
            route: '/main/access-control/permissions'
          }
        ]
      }
    ];
  }

  ngOnInit() {
    this.items = this.filterMenuItems(this.items);
  }

  filterMenuItems(items: MenuItem[] | undefined): MenuItem[] {
    if (!items) return [];
  
    return items
      .map(item => {
        const filteredItems = item.items ? this.filterMenuItems(item.items) : [];

        if (
          item['permission'] === 'ALL' || 
          (item['permission'] && this.permissions.includes(item['permission'])) || 
          filteredItems.length > 0
        ) {
          return { ...item, items: filteredItems };
        }
        return null;
      })
      .filter(Boolean) as MenuItem[];
  }
}
