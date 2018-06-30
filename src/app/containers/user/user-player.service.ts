import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as AppPlayerARS from '@store/app-player/index';
import * as NowPlaylistARS from '@store/now-playlist/index';

import {
  UserProfileService, YoutubePlayerService, NowPlaylistService
}  from '@core/services/index';


@Injectable ()
export class UserPlayerService {
  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private userProfileService: UserProfileService
    , private nowPlaylistService: NowPlaylistService
  ) {
  }//e constructor


  playSelectedPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.userProfileService.fetchPlaylistItems (playlist.id, '')
      .subscribe ((items: GoogleApiYouTubeVideoResource[]) => {
        this.store.dispatch (new NowPlaylistARS.QueueVideosE0R1 (items));
        this.nowPlaylistService.updateIndexByMedia (items[0].id);
        this.store.dispatch (new AppPlayerARS.LoadAndPlayE1R0 (items[0]));
      });
  }//e playSelectedPlaylist


  queuePlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.userProfileService.fetchPlaylistItems (playlist.id, '')
      .subscribe ((items: GoogleApiYouTubeVideoResource[]) => {
        this.store.dispatch (new NowPlaylistARS.QueueVideosE0R1 (items));
        return items;
      });
  }//e queuePlaylist


  queueVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch (new NowPlaylistARS.QueueE0R1 (media));
  }//e queueVideo


  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch (new AppPlayerARS.LoadAndPlayE1R0 (media));
    this.store.dispatch (new NowPlaylistARS.QueueE0R1 (media));
    this.store.dispatch (new NowPlaylistARS.SelectE1R1 (media));
  }//e playVideo
}
//e class
