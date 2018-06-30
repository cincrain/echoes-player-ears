import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';

import { AppApi } from '@core/api/index';


@Injectable ()
export class AppSidebarProxy {
  sidebarCollapsed$ = this.store.pipe (select (AppTopLevelFRS.AppLayoutState.getSidebarCollapsed));
  searchType$       = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getSearchType));

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private appApi: AppApi
  ) {
  }//e constructor


  toggleSidebar () {
    this.appApi.toggleSidebar ();
  }//e toggleSidebar
}
//e class
