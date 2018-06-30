import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { AppApi } from '@core/api/index';
import { AuthorizationService } from '@core/services/index';


@Component ({
  selector: 'app-navbar',
  template: `
  <nav class="row navbar navbar-default navbar-fixed-top">
    <div class="navbar-container">
      
      <div class="navbar__content">
        <h3 *ngIf="header" class="navbar__header navbar-text">
          <button *ngIf="mainIcon" class="navbar-btn__main btn-transparent"
            (click)="handleMainIconClick ()" >
            <icon [name]="mainIcon"></icon>
          </button>
          <icon *ngIf="headerIcon" [name]="headerIcon"></icon>{{ header }}
        </h3>
      
        <ng-content></ng-content>
      </div>
    
      <section class="navbar-text navbar-actions">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdzGRIXoHuzRFZU03EyhgwBJgJp6W1LMatz6Bn44L-5SyuxZA/viewform"
          class="navbar-action-link" target="_blank" >
          <icon name="star"></icon> Request New Features
        </a>

        <app-navbar-user
          [signedIn]="isSignIn ()"
          [userImageUrl]="(userProfileState$ | async).profile.imageUrl"
          (signIn)="signInUser ()" >
        </app-navbar-user>
        <app-navbar-menu
          [appVersion]="appVersion$ | async"
          [theme]="themes$ | async"
          [signedIn]="isSignIn ()"
          (changeTheme)="changeTheme ($event)"
          (signOut)="signOutUser ()"
          (updateVersion)="updateVersion ()"
          (checkVersion)="checkVersion ()" >
        </app-navbar-menu>
      </section>
    
    </div>
  </nav>
  `,
  styleUrls: ['./app-navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {
  themes$           = this.appApi.themes$;
  appVersion$       = this.appApi.appVersion$;
  userProfileState$ = this.appApi.userProfileState$;

  @Input  () header:    string;
  @Input  () headerIcon = '';
  @Input  () mainIcon   = '';
  @Output () signIn     = new EventEmitter();
  @Output () signOut    = new EventEmitter();
  @Output () headerMainIconClick = new EventEmitter();

  constructor (
    private appApi: AppApi
    , private authService: AuthorizationService
  ) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  isSignIn () {
    return this.authService.isSignIn ();
  }//e isSignIn


  handleMainIconClick () {
    this.headerMainIconClick.emit ();
  }//e handleMainIconClick


  signInUser () {
    this.appApi.signInUser ();
    // this.signIn.next ();
  }//e signInUser


  signOutUser () {
    this.appApi.signOutUser ();
    // this.signOut.next ();
  }//e signOutUser


  updateVersion () {
    this.appApi.updateVersion ();
  }//e updateVersion


  checkVersion () {
    this.appApi.checkVersion ();
  }//e checkVersion


  changeTheme (theme) {
    this.appApi.changeTheme (theme.value);
  }//e changeTheme
}//e class
