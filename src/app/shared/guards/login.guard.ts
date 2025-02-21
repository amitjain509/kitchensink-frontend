import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services';

export const loginGuard: CanActivateFn = (): Observable<boolean> => {
  const accountService: AccountService = inject(AccountService);
  const router: Router = inject(Router);
  return new Observable<boolean>(observer => {
    observer.next(true);
    accountService.getAccountDetails().subscribe({
      next: () => {
        router.navigate(['/main/dashboard']).then();
        observer.next(true);
        observer.complete();
      },
      error: () => {
        observer.next(true);
        observer.complete();
      }
    });
  });
};
