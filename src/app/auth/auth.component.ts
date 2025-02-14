// import { LoginComponent } from '../login/login.component';
// import { RegisterComponent } from '../register/register.component';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { Component } from '@angular/core';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-auth',
//   imports: [CommonModule, LoginComponent, RegisterComponent],
//   templateUrl: './auth.component.html',
//   styleUrl: './auth.component.scss'
// })
// export class AuthComponent {
//   isLogin = true; // Toggle state
//   private routerSubscription!: Subscription;
//   constructor(private router: Router, private route: ActivatedRoute) { }

//   ngOnInit() {
//     // Listen for route changes
//     this.routerSubscription = this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.isLogin = this.router.url === '/login';
//       }
//     });
//   }

//   toggleForm() {
//     this.router.navigate([this.isLogin ? '/register' : '/login']);
//   }

//   ngOnDestroy() {
//     if (this.routerSubscription) {
//       this.routerSubscription.unsubscribe();
//     }
//   }
// }



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isAdminLogin = false;

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  onItemChange(loginType: string): void {
    this.isAdminLogin = loginType == 'admin';
    this.router.navigate([this.isAdminLogin ? '/admin-login' : '/login']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInEmail')
    localStorage.removeItem('role')
    this.router.navigate(['/login'])
  }
}
