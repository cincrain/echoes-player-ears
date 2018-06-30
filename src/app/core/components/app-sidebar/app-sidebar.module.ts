import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AppSidebarComponent } from './app-sidebar.component';
import { AppBrandModule } from './app-brand/app-brand.module';
import { AppNavigatorModule } from './app-navigator/app-navigator.module';
import { AppSidebarProxy } from './app-sidebar.proxy';
import { NowPlayingModule } from './now-playing/now-playing.module';


@NgModule ({
  imports: [
    SharedModule.forRoot (),

    AppBrandModule,
    AppNavigatorModule,
    NowPlayingModule,

  ],
  declarations: [
    AppSidebarComponent
  ],
  exports: [
    AppSidebarComponent
  ]
})
export class AppSidebarModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule:  AppSidebarModule,
      providers: [AppSidebarProxy]
    };
  }//e static
}
//e class
