import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
    providedIn: 'root'
})
class LoginGuard {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem("token")) {
            if(this.authService.isAdmin()) {
                this.router.navigateByUrl('/admin');
            } else {
                this.router.navigateByUrl('/home');
            }
            return false;
        } else {
            console.log("test")
            return true;
        }
    }

}
export const LoginPermissionGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(LoginGuard).canActivate(next, state);
}