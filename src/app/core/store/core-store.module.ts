import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { echoesReducers, echoesActionTypes } from './freducers-selectors';
import { CustomRouterStateSerializer } from './router-store/index';
import { environment } from '@env/environment';


export function localStorageSyncReducer (
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync ({
    keys:      Object.keys (echoesReducers),
    rehydrate: true
  }) (reducer);
}
//e function


const metaReducers:   MetaReducer<any, any>[] = [localStorageSyncReducer];
const optionalImports = [];

if (!environment.production) {
  optionalImports.push (StoreDevtoolsModule.instrument ({ maxAge: 25 }));
}


@NgModule ({
  imports: [
    StoreModule.forRoot (echoesReducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot ({
      stateKey: 'router'
    }),
    ...optionalImports,

  ],
  providers: [
    ...echoesActionTypes,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ]
})
export class CoreStoreModule {}
//e class
