import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../service/user/user.service';

export const loggedGuard: CanActivateFn = () => {
  const userService = inject(UserService);

  if (userService.isLogged()) {
    const roles = userService.getLoggedUserRoles();
    if (roles) {
      if (roles === 'ROLE_USER') {
        return inject(Router).createUrlTree(['/products']);
      }
      if (roles === 'ROLE_ADMIN') {
        return inject(Router).createUrlTree(['/admin']);
      }
      if (roles === 'ROLE_KITCHEN') {
        return inject(Router).createUrlTree(['/kitchen']);
      }
    }
  }

  return true;
};
