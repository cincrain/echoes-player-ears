import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as NowPlaylistARS from '@store/now-playlist/index';

import { YoutubePlayerService, MediaParserService, UserProfileService
} from '@core/services/index';
import { toPayload } from '@shared/utils/data.utils';
import { map, switchMap, withLatestFrom, filter, tap, catchError
} from 'rxjs/operators';


@Injectable ()
export class NowPlaylistEffects {
  constructor (
    private actions$: Actions
    , private store: Store<AppTopLevelFRS.IEchoesState>
    , private mediaParserService: MediaParserService
    , private youtubePlayerService: YoutubePlayerService
    , private userProfileService: UserProfileService
  ) {
  }//e constructor


  @Effect ()
  selectE1R1__from_playlist_in_AppPlayerApi$
  // __asaresult_loadNextTrackE1R1_in_place(i.e. media_ended)
  // __asaresult_loadPlaylistEndE2R1_2nd_in_place
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.SELECT)
    , map (toPayload)
    , map ((media: GoogleApiYouTubeVideoResource) => 
        new NowPlaylistARS.QueueE0R1 (media)
    )
  );
  //e selectE1R1

  
  @Effect ()
  loadPlaylistStartE1R0__from_queuePlaylist_in_AppPlayerApi$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.LOAD_PLAYLIST_START)
    , map (toPayload)
    , switchMap ((id: string) => 
        this.userProfileService.fetchAllPlaylistItems (id)
    )
    , map ((playlistItems: GoogleApiYouTubeVideoResource[]) => 
        new NowPlaylistARS.LoadPlaylistEndE2R1 (playlistItems)
    )
  );
  //e loadPlaylistStartE1R0


  @Effect ()
  loadPlaylistEndE2R1_1st__asaresult_loadPlaylistStartE1R0_in_place$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.LOAD_PLAYLIST_END)
    , map (toPayload)
    , map ((playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new NowPlaylistARS.QueueVideosE0R1 (playlistItems)
    )
  );
  //e loadPlaylistEndE2R1_1st


  @Effect ()
  playPlaylistFirstTrack$
  // __from_playPlaylist_in_AppPlayerApi$
  // loadPlaylistEndE2R1_2nd__asaresult_loadPlaylistStartE1R0_in_place$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.LOAD_PLAYLIST_END)
    , map (toPayload)
    , map ((playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new NowPlaylistARS.SelectE1R1 (playlistItems[0])
    )
  );
  //e loadPlaylistEndE2R1_2nd


  @Effect ()
  loadNextTrackE1R1$
  // __from_ngOnInit_in_AppPlayerComponent$
  // __asaresult_changePlayerStartE1R0_in_place$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.MEDIA_ENDED)
    , map (toPayload)
    , withLatestFrom (this.store.select (AppTopLevelFRS.NowPlaylistState.getSelectedMediaId))
    , filter ((states: [any, GoogleApiYouTubeVideoResource]) =>
        states[1] && states[1].hasOwnProperty ('id')
    )
    , map ((states: [any, GoogleApiYouTubeVideoResource]) =>
        new NowPlaylistARS.SelectE1R1 (states[1])
    )
  );
  //e loadNextTrackE1R1

  
  @Effect ()
  selectAndSeekToTimeE2R0_1st__from_seekToTrack_in_NowPlaylistService$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.SELECT_AND_SEEK_TO_TIME)
    , map (toPayload)
    , map (trackEvent => new NowPlaylistARS.UpdateIndexE0R1 (trackEvent.media.id))
  );
  //e selectAndSeektoTimeE2R0_1st


  @Effect ({ dispatch: false })
  selectAndSeekToTimeE2R0_2nd__from_seekToTrack_in_NowPlaylistService$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.SELECT_AND_SEEK_TO_TIME)
    , map (toPayload)
    , tap (trackEvent => 
        this.youtubePlayerService.seekTo (this.mediaParserService.toNumber (trackEvent.time))
    )
  );
  //e selectAndSeekToTimeE2R0_2nd


  @Effect ()
  changePlayerStateE1R0__from_changePlayerState_in_AppPlayerApi$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.CHANGE_PLAYER_STATE)
    , map (toPayload)
    , filter ((data: YT.PlayerState) => data === YT.PlayerState.ENDED)
    , map (() => new NowPlaylistARS.MediaEndedE1R1 ())
  );
  //e changePlayerStateE1R0


  @Effect ()
  playPlaylist$
  = this.actions$.pipe (
    ofType (NowPlaylistARS.ActionTypes.PLAY_PLAYLIST)
    , map(toPayload)
    , map ((id: string) => new NowPlaylistARS.LoadPlaylistStartE1R0 (id))
  );
  //e playPlaylist
}
//e class
