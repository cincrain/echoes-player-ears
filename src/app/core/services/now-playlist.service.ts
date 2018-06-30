import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IEchoesState, getFNowPlaylistState } from '@store/freducers-selectors';
import * as NowPlaylistARS from '@store/now-playlist/index';

import { YoutubeVideosInfoService } from './youtube-videos-info.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable ()
export class NowPlaylistService {
  public nowPlaylistState$: Observable<NowPlaylistARS.INowPlaylistState>;

  constructor (
    private store: Store<IEchoesState>
    , private youtubeVideosInfoService: YoutubeVideosInfoService
  ) {
    this.nowPlaylistState$ = this.store.pipe (
      select (getFNowPlaylistState)
    );
  }//e constructor


  queueVideo (mediaId: string) {
    return this.youtubeVideosInfoService.api.list (mediaId)
      .pipe (map (items => items[0]));
  }//e queueVideo


  queueVideos (medias: GoogleApiYouTubeVideoResource[]) {
    this.store.dispatch (new NowPlaylistARS.QueueVideosE0R1 (medias));
  }//e queueVideos


  updateFilter (filter: string) {
    this.store.dispatch (new NowPlaylistARS.ChangeFilterE0R1 (filter));
  }//e updateFilter


  clearPlaylist () {
    this.store.dispatch (new NowPlaylistARS.RemoveAllE0R1 ());
  }//e clearPlaylist


  updateIndexByMedia (mediaId: string) {
    this.store.dispatch (new NowPlaylistARS.UpdateIndexE0R1 (mediaId));
  }//e updateIndexBuMedia


  removeVideo (media) {
    this.store.dispatch (new NowPlaylistARS.RemoveE0R1 (media));
  }//e removeVideo


  selectNextIndex () {
    this.store.dispatch (new NowPlaylistARS.SelectNextE0R1 ());
  }//e selectNextindex


  selectPreviousIndex () {
    this.store.dispatch (new NowPlaylistARS.SelectPreviousE0R1 ());
  }//e selecetPreviousIndex


  getCurrent () {
    let media;
    this.nowPlaylistState$.pipe (take (1))
      .subscribe (playlistState => {
        media = playlistState.videos.find (video => video.id === playlistState.selectedId);
      });
    return media;
  }//e getCurrent


  seekToTrack (trackEvent) {
    this.store.dispatch (new NowPlaylistARS.SelectAndSeekToTimeE2R0 (trackEvent));
  }
}
//e class
