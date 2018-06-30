import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { NowPlayingComponent } from './now-playing.component';
import { NowPlaylistComponent, NowPlaylistTrackComponent } from './now-playlist/index';
import { NowPlaylistFilterComponent } from './now-playlist-filter/index';


@NgModule ({
  imports: [
    SharedModule.forRoot (),
  ],
  declarations: [
    NowPlayingComponent,
    NowPlaylistComponent,
    NowPlaylistTrackComponent,
    NowPlaylistFilterComponent,

  ],
  exports: [
    NowPlayingComponent
  ]
})
export class NowPlayingModule {}
//e class
