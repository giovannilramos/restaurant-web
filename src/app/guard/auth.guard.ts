import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../service/user/user.service';

export const authGuard: CanActivateFn = () => {
  return inject(UserService).isLogged()
    ? true
    : inject(Router).createUrlTree(['/login']);
};
