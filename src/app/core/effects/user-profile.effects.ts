import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as UserProfileARS from '../store/user-profile/index';

import { toPayload } from '@shared/utils/data.utils';
import { UserProfileService, AuthorizationService } from '../services/index';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';


@Injectable ()
export class UserProfileEffects {
  constructor (
    private actions$: Actions
    , private userProfileService: UserProfileService
    , private authService: AuthorizationService
  ) {
  }//e constructor


  @Effect ({ dispatch: false })
  checkUserAuthE1R0__from_checkUserAuth_in_AppApi$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.CHECK_USER_AUTH)
    , switchMap (() => this.authService.loadAuth ())
    , map ((googleUser: gapi.auth2.GoogleUser) => 
        new UserProfileARS.SigninUserSuccessE3R0 (googleUser)
    )
  );
  //e checkUserAuthE1R0


  @Effect ({ dispatch: false })
  signinUserSuccessE3R0_1st__asaresult_checkUserAuthE1R0_in_place$
  // __asaresult_signinUserStartE1R0_in_place
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.SIGNIN_USER_SUCCESS)
    , map (toPayload)
    , tap ((res: any) => this.authService.setAuthTimer (res))
  );
  //e signinUserSuccessE3R0_1st


  @Effect ()
  signinUserSuccessE3R0_2nd__asaresult_checkUserAuthE1R0_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.SIGNIN_USER_SUCCESS)
    , map (toPayload)
    , map ((googleUser: gapi.auth2.GoogleUser) => 
        new UserProfileARS.UpdateTokenE1R1 (this.authService.extractToken (googleUser))
    )
  );
  //e signinUserSuccessE3R0_2nd

  
  @Effect ()
  signinUserSuccessE3R0_3rd__asaresult_checkUserAuthE1R0_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.SIGNIN_USER_SUCCESS)
    , map (toPayload)
    , map ((googleUser: gapi.auth2.GoogleUser) =>
        new UserProfileARS.UserProfileReceivedE1R0 (googleUser.getBasicProfile ())
    )
  );
  //e signinUserSuccessE3R0_3rd


  @Effect ()
  userProfileReceivedE1R0__asaresult_signInUserSuccessE3R0_3rd_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.USER_PROFILE_RECEIVED)
    , map (toPayload)
    , map (profile => this.userProfileService.toUserJson (profile))
    , map ((profile: UserProfileARS.GoogleBasicProfile) => 
        new UserProfileARS.UpdateUserProfileE0R1 (profile)
    )
  );
  //e userProfileReceivedE1R0


  @Effect ()
  updateTokenE1R1__asaresult_signinUserSuccessE3R0_2nd_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.UPDATE_TOKEN)
    , map (toPayload)
    , map ((token: string) => this.authService.accessToken = token)
    , switchMap (token => 
        this.userProfileService.getPlaylists (true).pipe (
          catchError ((err: Error) => {
            console.log ([`★★-->> [${Date ()}`
                        , `   -->> user-profile.effects.ts # updateTokenE1R1(ln:74+-)`
                        , `   -->> GET PLAYLISTS ERROR: ${JSON.stringify (err)} `]
                        .join('\n') );
            // return of (err);
            return new Observable (obs => obs.complete ());
          })
        )
    )
    , map (res => new UserProfileARS.UpdateDataE2R1 (res))
  );
  //e updateTokenE1R1


  @Effect ()
  updateDataE2R1_1st_asaresult_updateTokenE1R1_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.UPDATE_DATA)
    , map (toPayload)
    , map ((data: any) => new UserProfileARS.AddPlaylistsE0R1 (data.items))
  );
  //e updateDataE2R1_1st


  @Effect ()
  updateDataE2R1_2nd__asaresult_updateTokenE1R1_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.UPDATE_DATA)
    , map (toPayload)
    , map (({ nextPageToken }: any) => nextPageToken
        ? new UserProfileARS.UpdateNextPageTokenE0R1 (nextPageToken)
        : new UserProfileARS.UserProfileCompletedE0R0 ()
    )
  );
  //e updateDataE2R1_2nd


  @Effect ()
  signinUserE1R0__from_signinUser_in_AppApi$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.SIGNIN_USER)
    , map (() => new UserProfileARS.SigninUserStartE1R0 ())
  );
  //e signinUserE1R0


  @Effect ()
  signinUserStartE1R0__asaresult_signinUserE1R0_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.SIGNIN_USER_START)
    , switchMap (() => this.authService.signIn ()
        .pipe (
          // at this point verify process not login-ing but just pressing x button.
          tap ((res: any) => {
            console.log ([`★★-->> [${Date ()}`
                        , `   -->> user-profile.effects.ts # signinUserStartE1R0(ln:142+-)`
                        , `   -->> AUTHSERVICE.SIGNIN: ${JSON.stringify (res)} `]
                        .join('\n') );
          })
          , catchError (err => this.authService.handleFailedLogin (JSON.stringify (err)))
        )
    )
    , map ((res: any) => new UserProfileARS.SigninUserSuccessE3R0 (res))
  );
  //e signinuserStartE1R0


  @Effect ()
  signOutUserE1R0__from_signOutUser_in_AppApi$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.SIGNOUT_USER)
    , switchMap (() => this.authService.signOut ())
    , map (() => new UserProfileARS.SignoutUserSuccessE1R1 ())
  );
  //e signOutUserE1R0


  @Effect ({ dispatch: false })
  signOutUserSuccessE1R1__asaresult_signOutUserE1R0_in_place$
  = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.SIGNOUT_USER_SUCCESS)
    , tap (() => this.authService.disposeAutoSignIn ())
  );
  //e signOutUserSuccessE1r0
}
//e class
