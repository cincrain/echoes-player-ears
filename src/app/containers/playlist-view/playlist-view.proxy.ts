import { Injectable } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as NowPlaylistARS from '@store/now-playlist/index';
import * as UserProfileARS from '@store/user-profile/index';

import { AppPlayerApi, AppApi } from '@core/api/index';
import { map } from 'rxjs/operators';


export interface PlaylistData {
  videos:        GoogleApiYouTubeVideoResource[];
  playlist:      GoogleApiYouTubePlaylistResource;
}
//e interface


@Injectable ()
export class PlaylistProxy {
  nowPlaylistIds$ = this.store.pipe (select (AppTopLevelFRS.NowPlaylistState.getPlaylistMediaIds));

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private appPlayerApi: AppPlayerApi
    , private appApi: AppApi
  ) {
  }//e constructor


  goBack () {
    this.appApi.navigateBack ();
  }//e goBack


  toRouteData (route: ActivatedRoute) {
    return route.data;
  }//e toRouteData


  fetchPlaylist (route: ActivatedRoute) {
    return this.toRouteData (route).pipe (
      map ((data: PlaylistData) => data.playlist)
    );
  }//e fetchPlaylist


  fetchPlaylistVideos (route: ActivatedRoute) {
    return this.toRouteData (route).pipe (
      map ((data: PlaylistData) => data.videos)
    );
  }//e fetchPlaylistVideos


  fetchPlaylistHeader (route: ActivatedRoute) {
    return this.fetchPlaylist (route).pipe (
      map ((playlist: GoogleApiYouTubePlaylistResource) => {
        const { snippet, contentDetails } = playlist;
        return `${snippet.title} (${contentDetails.itemCount} videos)`;
      })
    );
  }//e fetchPlaylistHeader


  playPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.playPlaylist (playlist);
  }//e playPlaylist


  queuePlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.queuePlaylist (playlist);
  }//e queuePlaylist


  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo (media);
  }// eplayVideo


  queueVideo (media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.queueVideo (media);
  }//e queueVideo


  unqueueVideo (media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.removeVideoFromPlaylist (media);
  }//e unqueueVideo
}
//e class
