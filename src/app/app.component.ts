import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';

import { AppApi } from '@core/api/app.api';
import { VersionCheckerService } from '@core/services/index';
import { Subscription } from 'rxjs';


@Component ({
  selector: 'body',
  template: `
  <app-player class="navbar navbar-default navbar-fixed-bottom">
  </app-player>
  
  <app-sidebar
    [class.closed]="sidebarCollapsed$ | async" >
  </app-sidebar>

  <div class="container-main">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  sidebarCollapsed$ = this.store.pipe (select (AppTopLevelFRS.AppLayoutState.getSidebarCollapsed));
  theme$            = this.store.pipe (select (AppTopLevelFRS.AppLayoutState.getAppTheme));

  @HostBinding ('class') style = 'arctic';

  versionChecker$:    Subscription;

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private versionCheckerService: VersionCheckerService
    , private appApi: AppApi
  ) {
    this.versionCheckerService.start ();
    this.appApi.checkUserAuth ();
  }//e constructor


  ngOnInit () {
    this.theme$.subscribe ((theme: string) => this.style = theme);
  }//e ngOnInit


  ngOnDestroy () {
    this.versionChecker$.unsubscribe ();
  }//e ngOnDestory
}
//e class
