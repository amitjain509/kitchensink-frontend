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
            route: '/admin/user'
          },
          {
            label: 'Exercise',
            icon: 'pi pi-file-edit',
            route: '/admin/exercise'
          },
          {
            label: 'Aircraft Onboarding',
            icon: 'pi pi-compass',
            route: '/admin/aircraft'
          }
        ]
      },
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
