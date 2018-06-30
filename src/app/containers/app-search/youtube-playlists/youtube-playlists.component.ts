import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as PlayerSearchARS from '@store/player-search/index';

import { AppPlayerApi } from '@core/api/index';
import { fadeInAnimation } from '@shared/animations/fade-in.animations';


@Component ({
  selector: 'youtube-playlists',
  template: `
  <loader
    [message]="'Loading Awesome Playlists Results'"
    [loading]="isSearching$ | async" >
  </loader>

  <section class="videos-list">
    <div class="ux-maker is-flex-row is-flex-wrap is-content-aligned-h">
      <youtube-playlist class="is-media-responsive"
        [@fadeIn]
        link=""
        *ngFor="let playlist of results$ | async"
        [media]="playlist"
        (play)="playPlaylist (playlist)"
        (queue)="queueSelectedPlaylist (playlist)" >
      </youtube-playlist>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class YoutubePlaylistsComponent implements OnInit {
  results$      = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getResults));
  isSearching$  = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getIsSearching));

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private appPlayerApi: AppPlayerApi
  ) {
  }//e constructor


  ngOnInit () {
    this.store.dispatch (
      new PlayerSearchARS.UpdateSearchTypeE0R1 (PlayerSearchARS.CSearchTypes.PLAYLIST)
    );
    this.store.dispatch (new PlayerSearchARS.StartPlaylistsSearchE2R1 ());
  }//e ngOnInit


  playPlaylist (media: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.playPlaylist (media);
  }//e playPlaylist


  queueSelectedPlaylist (media: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.queuePlaylist (media);
  }//e queueSelectedPlaylist
}
//e class
