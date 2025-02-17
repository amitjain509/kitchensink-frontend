import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard triggered');
  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    router.navigateByUrl('/menu')
    return false;  // Allow access if authenticated
  }
  // Redirect to login if not authenticated
  router.navigateByUrl('/login');
  return true;
};
