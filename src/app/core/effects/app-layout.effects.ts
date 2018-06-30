import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as AppLayoutARS from '../store/app-layout/index';

import { VersionCheckerService } from '../services/index';
import { map } from 'rxjs/operators';


@Injectable ()
export class AppLayoutEffects {
  constructor (
    private actions$: Actions
    , private versionCheckerService: VersionCheckerService
  ) {
  }//e constructor


  @Effect ({ dispatch: false })
  updateAppVersionE1R0__from_updateVersion_in_AppApi$
  = this.actions$.pipe (
    ofType (AppLayoutARS.ActionTypes.UPDATE_APP_VERSION)
    , map (() => this.versionCheckerService.updateVersion ())
  );
  //updateVersioneE1R0


  @Effect ({ dispatch: false })
  checkAppVersionE1R1__from_checkVersion_in_AppApi$
  = this.actions$.pipe (
    ofType (AppLayoutARS.ActionTypes.CHECK_APP_VERSION)
    , map (() => this.versionCheckerService.checkForVersion ())
  );
  //e checkAppVersionE1R1
}
//e class
