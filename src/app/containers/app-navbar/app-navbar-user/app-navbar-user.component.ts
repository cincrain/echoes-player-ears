import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy
} from '@angular/core';


@Component ({
  selector: 'app-navbar-user',
  template: `
  <a class="btn btn-link navbar-link navbar-btn"
    *ngIf="signedIn; else userNotSignedIn"
    [routerLink]="['/user']" >
    <img class="user-icon" [src]="userImageUrl">
  </a>
  <ng-template #userNotSignedIn>
    <span class="btn btn-link navbar-link navbar-btn"
      (click)="handleSignIn ()" >
      <icon name="sign-in"></icon>
      Sign In
    </span>
  </ng-template>
  `,
  styleUrls: ['./app-navbar-user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarUserComponent implements OnInit {
  @Input  () signedIn     = false;
  @Input  () userImageUrl = '';
  @Output () signIn       = new EventEmitter ();

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  handleSignIn () {
    this.signIn.emit ();
  }//e handleSignIn
}
//e class
