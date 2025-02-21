import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true;  // Allow access if authenticated
  }
  // Redirect to login if not authenticated
  router.navigateByUrl('/account/login');
  return false;
};
