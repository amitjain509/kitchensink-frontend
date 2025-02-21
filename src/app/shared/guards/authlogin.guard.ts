import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

export const AuthLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is already authenticated
  if (authService.isAuthenticated()) {
    // Redirect to menu if the user is already authenticated
    router.navigateByUrl('/main');
    return false;  // Prevent access to the login page
  }
  return true;  // Allow access to login page if not authenticated
};
