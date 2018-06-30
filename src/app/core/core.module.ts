import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreStoreModule } from './store/core-store.module';
import { EffectsModule } from '@ngrx/effects';

import { CORE_EFFECTS } from './effects/index';
import { CORE_API } from './api/index';
import { CORE_RESOLVERS } from './resolvers/index';
import { CORE_SERVICES } from './services/index';

@NgModule ({
  imports: [
    CoreStoreModule,
    EffectsModule.forRoot ([...CORE_EFFECTS]),

  ]
})
export class CoreModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...CORE_API,
        ...CORE_RESOLVERS,
        ...CORE_SERVICES,
        
      ]
    };
  }//e static
}
//e class
