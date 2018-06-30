import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppNavbarModule } from '../app-navbar/index';
import { APPSEARCH_ROUTES } from './app-search.routes';

import { AppSearchComponent } from './app-search.component';
import { PlayerSearchComponent } from './player-search/index';
import { SearchNavigatorComponent } from './search-navigator/index';
import { YoutubeVideosComponent } from './youtube-videos/index';
import { YoutubePlaylistsComponent } from './youtube-playlists/index';


@NgModule ({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SharedModule.forRoot (),
    AppNavbarModule,

  ],
  declarations: [
    AppSearchComponent,
    PlayerSearchComponent,
    SearchNavigatorComponent,
    YoutubeVideosComponent,
    YoutubePlaylistsComponent,

  ],
  exports: [
    AppSearchComponent
  ]
})
export class AppSearchModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule:  RootAppSearchModule,
      providers: []
    };
  }
}
//e class


@NgModule ({
  imports: [
    AppSearchModule
    , RouterModule.forChild ([...APPSEARCH_ROUTES])
  ]
})
export class RootAppSearchModule {}
//e class
