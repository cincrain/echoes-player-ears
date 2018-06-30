import { Injectable, NgZone } from '@angular/core';
import { GapiLoaderService } from './gapi-loader.service';
import { environment } from '@env/environment';

import { Observable, Subscription, timer } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { filter, map, switchMap, tap, retry, timeInterval, catchError } from 'rxjs/operators';


const extractAccessToken = (_googleAuth: gapi.auth2.GoogleAuth) => {
  return (
    _googleAuth && _googleAuth.currentUser.get ().getAuthResponse ()
    .access_token
  );
}; //e const


@Injectable ()
export class AuthorizationService {
  private _googleAuth:     gapi.auth2.GoogleAuth;
  private _scope           = 'profile email https://www.googleapis.com/auth/youtube';
  private _accessToken:    string;
  private autoSignInTimer: Subscription;

  set accessToken (value) {
    this._accessToken = value;
  }
  get accessToken () {
    const token = {
      fromGoogle: extractAccessToken (this._googleAuth),
      fromApp:    this._accessToken,
      equal:      true
    };
    return token.fromGoogle;
  }//e accessToken

  constructor (
    private gapiLoaderService: GapiLoaderService
    , private zone: NgZone
  ) {
  }//e constructor


  loadAuth () {
    // attempt to silent authorize
    // __from_checkUserAuthE1R0_in_UserProfileEffects
    return this.gapiLoaderService.load ('auth2').pipe (
      switchMap (() => this.authorize ())
      , tap ((googleAuth: gapi.auth2.GoogleAuth) => {
          this.saveGoogleAuth (googleAuth);
          this.listenToGoogleAuthSignIn (googleAuth);
      })
      , filter ((googleAuth: gapi.auth2.GoogleAuth) => 
          this.isSignIn () && this.hasAccessToken (googleAuth)
      )
      , map ((googleAuth: gapi.auth2.GoogleAuth) => 
          googleAuth.currentUser.get ()
      )
      , catchError (err => {
          console.log ([`★★-->> [${Date ()}`
                      , `   -->> authorization.service.ts # loadAuth(ln:59+-)`
                      , `   -->> SIGNIN DIALOG ERROR: ${err} `]
                      .join('\n') );
          return new Observable (obs => obs.complete ());
      })
    );
  }//e loadAuth


  authorize () {
    if (this._googleAuth) {
      console.log ([`★★-->> [${Date ()}`
                  , `   -->> authorization.service.ts # authorize(ln:59+-)`
                  , `   -->> 1ST GOOGLEAUTH STATUS: ${JSON.stringify (this._googleAuth)} `]
                  .join('\n') );
    }
    const authOptions = {
      client_id: environment.youtube.CLIENT_ID,
      scope:     this._scope
    };
    return window['gapi'].auth2.init (authOptions);
  }//e authorize


  private saveGoogleAuth (googleAuth: gapi.auth2.GoogleAuth): gapi.auth2.GoogleAuth {
    this._googleAuth = googleAuth;
    return googleAuth;
  }//e saveGoogleAuth


  private listenToGoogleAuthSignIn (googleAuth: gapi.auth2.GoogleAuth) {
    window['gapi']['auth2'].getAuthInstance ().isSignedIn.listen (authState => {
      console.log ([`★★-->> [${Date ()}`
                  , `   -->> authorization.service.ts # listenToGoogleAuthSignIn(ln:92+-)`
                  , `   -->> AUTHSTATE CHANGED TO: ${authState} `]
                  .join('\n') );
    });
  }//e listenToGoogleAuthSignIn


  private hasAccessToken (googleAuth: gapi.auth2.GoogleAuth): boolean {
    return (
      googleAuth && googleAuth.currentUser
        .get ()
        .getAuthResponse ()
        .hasOwnProperty ('access_token')
    );
  }//e hasAccessToken


  // signin process: show up login dialog
  // __from_signinUserStartE1R0_in_UserProfileEffects
  signIn () {
    const signInOptions: gapi.auth2.SigninOptions = { scope: this._scope };
    if (this._googleAuth) {
      return fromPromise (this._googleAuth.signIn (signInOptions));
    }
    return new Observable (obs => obs.complete ());
  }//e signIn


  extractToken (googleUser: gapi.auth2.GoogleUser) {
    const authResponse = googleUser.getAuthResponse ();
    return authResponse.access_token;
  }//e extractToken


  setAuthTimer (googleUser: gapi.auth2.GoogleUser) {
    const MILLISECOND     = 1000;
    const expireTime      = 60 * 5;
    const expireTimeInMs  = expireTime * MILLISECOND;
    this.disposeAutoSignIn ();
    this.autoSignInTimer  = this.startTimerToNextAuth (expireTimeInMs);
  }//e setAuthTimer


  startTimerToNextAuth (timeInMs: number): Subscription {
    return timer (timeInMs).pipe (
      timeInterval ()
      , switchMap (() => this.authorize ())
      , tap ((googleAuth: gapi.auth2.GoogleAuth) => 
          this.saveGoogleAuth (googleAuth)
      )
      , map ((googleAuth: gapi.auth2.GoogleAuth) => 
          googleAuth.currentUser.get ()
      )
      , retry (3)
      , catchError (err => {
          window.location.reload ();
          this.printError (err);
          return err;
      })
    )
    .subscribe ((googleUser: gapi.auth2.GoogleUser) => {
      this.zone.run (() => this.setAuthTimer (googleUser));
    });
  }//e startTimerToNextAuth


  private printError (err) {
    console.log ([`★★-->> [${Date ()}`
                , `   -->> authorization.service.ts # startTimerToNextAuth(ln:160+-)`
                , `   -->> AUTH CHECK EVERY 5MIN, error: ${err} `]
                .join('\n') );
  }//e printError


  handleFailedLogin (res) {
    console.log ([`★★-->> [${Date ()}`
                , `   -->> authorization.service.ts # handleFailedLogin(ln:168+-)`
                , `   -->> FAILED TO LOGIN: ${res} `]
                .join('\n') );
    return new Observable (obs => {
      // obs.error ();
      obs.complete ();
    });
  }//e handleFailedLogin


  isSignIn () {
    return this._googleAuth && this._googleAuth.isSignedIn.get ();
  }//e isSignIn


  signOut () {
    return this._googleAuth.signOut ();
  }//e signOut


  disposeAutoSignIn () {
    if (this.autoSignInTimer) {
      this.autoSignInTimer.unsubscribe ();
    }
  }//e disposeAutoSignIn
}
//e class
