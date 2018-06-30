import { Injectable } from '@angular/core';
import { Router, RouterState } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RouterStoreARS from '@store/router-store/index';

import { toPayload } from '@shared/utils/data.utils';
import { map, tap } from 'rxjs/operators';


@Injectable ()
export class RouterStoreEffects {
  constructor (
    private actions$: Actions
    , private router: Router
    , private localtion: Location
  ) {
  }//e constructor


  @Effect ({ dispatch: false })
  goE1R0
  = this.actions$.pipe (
    ofType (RouterStoreARS.ActionTypes.GO)
    , map (toPayload)
    , tap (({ path, query: queryParams, extras }) =>
        this.router.navigate (path, { queryParams, ...extras })
    )
  );
  //e navigateE1R0


  @Effect ({ dispatch: false })
  backE1R0
  = this.actions$.pipe (
    ofType (RouterStoreARS.ActionTypes.BACK)
    , tap (() => this.localtion.back ())
  );
  //e backE1R0


  @Effect ({ dispatch: false })
  forwardE1R0
  = this.actions$.pipe (
    ofType (RouterStoreARS.ActionTypes.FORWARD)
    , tap (() => this.localtion.forward ())
  );
  //e forwardE1R0
}
//e class
