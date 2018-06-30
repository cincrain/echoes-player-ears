import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as PlayerSearchARS from '@store/player-search/index';
import * as AppPlayerARS from '@store/app-player/index';
import * as NowPlaylistARS from '@store/now-playlist/index';

import { AppPlayerApi } from '@core/api/app-player.api';


@Component ({
  selector: 'youtube-videos',
  template: `
  <loader
    [message]="'Loading Awesome Media Results'"
    [loading]="loading$ | async" >
  </loader>
  <youtube-list
    [list]="videos$ | async"
    [queued]="playlistIds$ | async"
    (play)="playSelectedVideo ($event)"
    (queue)="queueSelectedVideo ($event)"
    (unqueue)="removeVideoFromPlaylist ($event)" >
  </youtube-list>
  `,
  styleUrls: ['./youtube-videos.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideosComponent implements OnInit {
  videos$       = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getResults));
  playlistIds$  = this.store.pipe (select (AppTopLevelFRS.NowPlaylistState.getPlaylistMediaIds));
  loading$      = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getIsSearching));

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private appPlayerApi: AppPlayerApi
  ) {
  }//e constructor
  
  
  ngOnInit () {
    this.store.dispatch (
      new PlayerSearchARS.UpdateSearchTypeE0R1 (PlayerSearchARS.CSearchTypes.VIDEO)
    );
    this.store.dispatch (new PlayerSearchARS.SearchCurrentQueryE1R0 ());
  }//e ngOnInit


  playSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo (media);
  }//e playSelectedVideo


  queueSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.queueVideo (media);
  }//e queueSelectedVideo


  removeVideoFromPlaylist (media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.removeVideoFromPlaylist (media);
  }//e removeVideoFromPlaylist
}
//e class
