import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as AppPlayerARS from '@store/app-player/index';

import { YoutubePlayerService, YoutubeVideosInfoService } from '@core/services/index';
import { toPayload } from '@shared/utils/data.utils';
import { Observable, defer, of } from 'rxjs';
import { map, exhaustMap, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators';


@Injectable ()
export class AppPlayerEffects {
  constructor (
    private actions$: Actions
    , private store: Store<AppTopLevelFRS.IEchoesState>
    , private youtubePlayerService: YoutubePlayerService
    , private youtubeVideosInfoService: YoutubeVideosInfoService
  ) {
  }//e constructor


  @Effect ()
  init$ = defer (() => of (new AppPlayerARS.ResetFullscreenE0R1 ()));

  
  @Effect ({ dispatch: false })
  setupPlayerE1R0__from_setupPlayer_in_AppPlayerApi$
  = this.actions$.pipe (
    ofType (AppPlayerARS.ActionTypes.SETUP_PLAYER)
    , map (toPayload)
    , tap (player => this.youtubePlayerService.setupPlayer (player))
  );
  //e setupPlayerE1R0


  @Effect ({ dispatch: false })
  toggleFullscreenE1R1__from_toggleFullscreen_in_AppPlayerApi$
  = this.actions$.pipe (
    ofType (AppPlayerARS.ActionTypes.FULLSCREEN)
    , withLatestFrom (this.store.select (AppTopLevelFRS.AppPlayerState.getPlayerFullscreen))
    , tap ((states: [any, { on; width; height; }]) =>
        this.youtubePlayerService.setSize (states[1].height, states[1].width)
    )
  );
  //e toggleFullscreenE1R1


  @Effect ()
  loadAndPlayE1R0__from_playVideo_in_AppPlayerApi$
  // __from_playSelectedPlaylist_in_UserPlayerService
  = this.actions$.pipe (
    ofType (AppPlayerARS.ActionTypes.LOAD_AND_PLAY)
    , map (toPayload)
    , switchMap((media: any) => 
        this.youtubeVideosInfoService.fetchVideoData (media.id || media.id.videoId)
        .pipe (
          map ((video: any) => new AppPlayerARS.PlayE1R1 (video))
          , catchError (err => {
              console.log ([`★★-->> [${Date ()}`
                          , `   -->> app-player.effects.ts # loadAndPlayE1R0(ln:60+-)`
                          , `   -->> CATCHERROR: ${JSON.stringify (err)} `]
                          .join('\n') );
              return of (new AppPlayerARS.AppPlayerErrorE0R1 ('load_and_play >> fetchVideoData >> Error'));
          })
        )
    )
  );
  //e loadAndPlayE1R0

  
  @Effect ()
  playE1R1__from_selectVideo_in_NowPlayingComponent$
  = this.actions$.pipe (
    ofType (AppPlayerARS.ActionTypes.PLAY)
    , map (toPayload)
    , switchMap ((media: any) => 
        of (this.youtubePlayerService.playVideo (media))
          .pipe (
            tap ((video: any) => 
              console.log ([`★★-->> [${Date ()}`
                          , `   -->> app-player.effects.ts # playE1R1(ln:38+-)`
                          , `   -->> YOUTUBE PLAYER INFO: ${JSON.stringify (video)} `]
                          .join('\n') )
            )
            , map ((video: any) => new AppPlayerARS.PlayStartedE0R0 (video))
            , catchError (err => of ({ type: 'PLAY_ERROR' }))
          )
    )
  );
  //e playE1R1


  @Effect ({ dispatch: false })
  pauseE1R0__from_pauseVideo_in_AppPlayerApi$
  = this.actions$.pipe (
    ofType (AppPlayerARS.ActionTypes.PAUSE)
    , tap (() => this.youtubePlayerService.pause ())
  );
  //e pauseE1R0


  @Effect ()
  changePlayerStateE1R0__from_changePlayerState_in_AppPlayerApi$
  = this.actions$.pipe (
    ofType (AppPlayerARS.ActionTypes.CHANGE_PLAYER_STATE)
    , map (toPayload)
    , map ((data: YT.PlayerState) => new AppPlayerARS.UpdateStateE0R1 (data))
  );
  //e changePlayerStateE1R0



}
//e class
