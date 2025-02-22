import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { Menu } from 'primeng/menu';
import { Menubar } from 'primeng/menubar';
import { debounceTime, delay, filter, fromEvent, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    Menubar,
    Avatar,
    Menu,
    NgIf,
    Button,
    RouterLink,
    FormsModule,
    PrimeTemplate,
    ReactiveFormsModule,
    DynamicDialogModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [DialogService]
})
export class NavbarComponent implements OnInit {
  showProfile: boolean;
  items: Array<MenuItem>;
  loggedUserName!: any;
  loggedEmail!: any;

  public readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public readonly router: Router = inject(Router);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.items = [];
    this.showProfile = Boolean(this.activatedRoute.snapshot.queryParamMap.get('showProfile'));
  }

  public ngOnInit(): void {
    this._setupResizeListener();
    this._setupRouteChangeListener();
    this.loggedUserName = localStorage.getItem('name') == 'null' ? localStorage.getItem('email') : '';
    this.loggedEmail = localStorage.getItem('email');
    this._init();
  }

  public toggleSidebar(): void {
    document.querySelector('body')?.classList.toggle('hide-sidebar');
  }

  private _init(): void {

    this.items = [
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => this._logout()
      }
    ];
  }

  private _setupResizeListener(): void {
    fromEvent(window, 'resize')
      .pipe(startWith(window.innerWidth), debounceTime(100), takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._handleResize());
  }

  private _handleResize(): void {
    if (window.innerWidth < 640) {
      document.querySelector('body')?.classList.add('hide-sidebar');
    } else {
      document.querySelector('body')?.classList.remove('hide-sidebar');
    }
  }

  private _setupRouteChangeListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(() => of(window.innerWidth).pipe(delay(100))),
        filter(width => width < 640)
      )
      .subscribe(() => document.querySelector('body')?.classList.add('hide-sidebar'));
  }

  private _logout(): void {
    this.router.navigate(['/account/login']).then(() => localStorage.removeItem('token'));
  }
}
