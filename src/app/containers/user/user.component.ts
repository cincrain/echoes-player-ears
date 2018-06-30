import {
  Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';

import { AppApi } from '@core/api/index';


@Component ({
  selector: 'app-user',
  template: `
  <article>
    <app-navbar
      [header]="'My Profile - My Playlists'"
      [headerIcon]="'heart'" >
    </app-navbar>
    <p *ngIf="!(isSignedIn$ | async)" class="well lead">
      To View your playlists in youtube, you need to sign in.
      <button class="btn btn-lg btn-primary"
        (click)="signInUser ()" >
        <icon name="google"></icon> 로그인
      </button>
    </p>
  
    <router-outlet></router-outlet>  
  </article>  
  `,
  styleUrls: ['./user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  isSignedIn$ = this.store.pipe (select (AppTopLevelFRS.UserProfileState.getIsSignedIn));

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private appApi: AppApi
  ) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  signInUser () {
    this.appApi.signInUser ();
  }//e signInUser
}
//e class
