import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as UserProfileARS from '@store/user-profile/index';
import * as PlayerSearchARS from '@store/player-search/index';
import * as AppPlayerARS from '@store/app-player/index';

import { toPayload } from '@shared/utils/data.utils';
import { AnalyticsService } from '@core/services/index';
import { map, switchMap, withLatestFrom, tap } from 'rxjs/operators';


@Injectable ()
export class AnalyticsEffects {
  constructor (
    private actions$: Actions
    , private store: Store<AppTopLevelFRS.IEchoesState>
    , private analyticsService: AnalyticsService
  ) {
  }//e constructor


  @Effect ({ dispatch: false })
  trackToken$ = this.actions$.pipe (
    ofType (UserProfileARS.ActionTypes.USER_PROFILE_RECEIVED)
    , map (toPayload)
    , tap (() => this.analyticsService.trackSignin ())
  );
  //e trackToken


  @Effect ({ dispatch: false })
  trackSearch$ = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.SEARCH_NEW_QUERY
      , PlayerSearchARS.ActionTypes.SEARCH_MORE_FOR_QUERY
    )
    , map (toPayload)
    , withLatestFrom (this.store.select (AppTopLevelFRS.PlayerSearchState.getSearchType))
    , tap ((states: any[]) => this.analyticsService.trackSearch (states[1]))
  );
  //e trackSearch


  @Effect ({ dispatch: false })
  trackPlay$ = this.actions$.pipe (
    ofType (AppPlayerARS.ActionTypes.PLAY_STARTED)
    , map (toPayload)
    , tap (() => this.analyticsService.trackVideoPlay ())
  );
  //e trackPlay
}
//e class
