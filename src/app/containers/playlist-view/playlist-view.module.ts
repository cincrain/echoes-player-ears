import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppNavbarModule } from '../app-navbar/index';

import { PlaylistViewComponent } from './playlist-view.component';
import { PlaylistProxy } from './playlist-view.proxy';
import { PLAYLIST_ROUTES } from './playlist-view.routes';


@NgModule ({
  imports: [
    RouterModule,
    SharedModule.forRoot (),
    AppNavbarModule,

  ],
  declarations: [
    PlaylistViewComponent,

  ],
  exports: [
    PlaylistViewComponent
  ]
})
export class PlaylistViewModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule:   RootPlaylistViewModule
      , providers: [PlaylistProxy]
    };
  }//e static
}
//e class


@NgModule ({
  imports: [
    PlaylistViewModule
    , RouterModule.forChild ([...PLAYLIST_ROUTES])
  ]
})
export class RootPlaylistViewModule {}
//e class
