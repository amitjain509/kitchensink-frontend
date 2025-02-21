import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  imports: [Menu, Ripple, RouterLinkActive, RouterLink, PrimeTemplate],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  items: MenuItem[] | undefined;

  constructor() {
    this.items = [
      {
        label: 'Roster',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            route: '/main/dashboard'
          }
        ]
      },
      {
        label: 'User Management',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-users',
            route: '/main/user'
          }
        ]
      },
      {
        label: 'Access Management',
        items: [
          {
            label: 'Roles',
            icon: 'pi pi-users',
            route: '/main/access-control/roles'
          },
          {
            label: 'Permissions',
            icon: 'pi pi-wrench',
            route: '/main/access-control/permissions'
          }
        ]
      }
      // {
      //   label: 'Users Management',
      //   items: [
      //     {
      //       label: 'All Users',
      //       icon: 'pi pi-users',
      //       route: '/admin/user'
      //     }
      //   ]
      // }
    ];
  }
}
