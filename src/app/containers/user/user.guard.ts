import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot
  , CanActivate, CanActivateChild
} from '@angular/router';

import { AuthorizationService } from '@core/services/index';


@Injectable ()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor (
    private router: Router
    , private authService: AuthorizationService
  ) {
  }//e constructor


  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log ([`★★-->> [${Date ()}`
                , `   -->> user.guard.ts # canActivate(ln:19+-)`
                , `   -->> RouterStateSnapshot: ${state} `]
                .join('\n') );
    const url: string = state.url;
    return this.checkLogin (url);
  }//e canActivate


  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate (route, state);
  }//e canActivateChild


  checkLogin (url: string): boolean {
    if (this.authService.isSignIn ()) return true;
    this.router.navigate (['/user']);
  }//e checkLogin
}
//e class
