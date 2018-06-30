import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IEchoesState } from '@store/freducers-selectors';
import * as AppPlayerARS from '@store/app-player/index';
import * as NowPlaylistARS from '@store/now-playlist/index';
import { NowPlaylistEffects } from '@core/effects/index';

import { toPayload } from '@shared/utils/data.utils';
import { map, take } from 'rxjs/operators';


@Injectable ()
export class AppPlayerApi {
  constructor (
    private store: Store<IEchoesState>
    , private nowPlaylistEffects: NowPlaylistEffects
  ) {
  }//e constructor


  setupPlayer (player) {
    this.store.dispatch (new AppPlayerARS.SetupPlayerE1R0 (player));
  }//e setupPlayer


  playPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    // pending NowPlaylistARS.ActionTypes.LOAD_PLAYLIST_END
    // getting playlistItems[0]
    this.nowPlaylistEffects.playPlaylistFirstTrack$.pipe (
      map (toPayload)
      , take (1)
    )
    .subscribe ((media: GoogleApiYouTubeVideoResource) =>
      this.playVideo (media)
    );

    this.queuePlaylist (playlist);
  }//e playPlaylist


  queuePlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.store.dispatch (
      new NowPlaylistARS.LoadPlaylistStartE1R0 (playlist.id)
    );
  }//e queuePlaylist


  resetPlayer () {
    this.store.dispatch (new AppPlayerARS.ResetE0R1 ());
  }//e resetPlayer


  toggleFullscreen () {
    this.store.dispatch (new AppPlayerARS.FullscreenE1R1 ());
  }//e toggleFullscreen


  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch (new AppPlayerARS.LoadAndPlayE1R0 (media));
    this.store.dispatch (new NowPlaylistARS.SelectE1R1 (media));
  }//e playVideo


  queueVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch (new NowPlaylistARS.QueueE0R1 (media));
  }//e queueVideo


  removeVideoFromPlaylist (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch (new NowPlaylistARS.RemoveE0R1 (media));
  }//e removeVideoFromPlaylist


  pauseVideo () {
    this.store.dispatch (new AppPlayerARS.PauseE1R0 ());
  }//e pauseVideo


  togglePlayer () {
    this.store.dispatch (new AppPlayerARS.TogglePlayerE0R1 (true));
  }//e togglePlayer


  toggleRepeat () {
    this.store.dispatch (new NowPlaylistARS.ToggleRepeatE0R1 ());
  }//e toggleRepear


  changePlayerState (event: YT.OnStateChangeEvent) {
    this.store.dispatch (new AppPlayerARS.ChangePlayerStateE1R0 (event.data));
    this.store.dispatch (new NowPlaylistARS.ChangePlayerStateE1R0 (event.data));
  }//e changePlayerState

}
//e class
