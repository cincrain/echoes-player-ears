import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy, HostBinding, HostListener
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as AppPlayerARS from '@store/app-player/index';
import * as NowPlaylistARS from '@store/now-playlist/index';

import { AppPlayerApi } from '@core/api/index';
import { NowPlaylistService } from '@core/services/index';
import { NowPlaylistEffects } from '@core/effects/index';


@Component ({
  selector: 'app-player',
  template: `
  <section
    [class.show-youtube-player]="isShowPlayer$ | async"
    [class.fullscreen]="(isPlayerFullscreen$ | async).on" >
    <div class="yt-player ux-maker">
      <player-resizer
        [fullscreen]="isShowPlayer$ | async"
        (toggle)="togglePlayer ()" >
      </player-resizer>
      <youtube-player
        (ready)="setupPlayer ($event)"
        (change)="changePlayerState ($event)" >
      </youtube-player>
    </div>

    <div class="container">
      <image-blur *ngIf="!(isPlayerFullscreen$ | async).on"
        [media]="media$ | async" >
      </image-blur>
      <media-info
        [playerState]="playerState$ | async"
        [minimized]="media$ | async"
        (thumbClick)="toggleFullscreen ()" >
      </media-info>
      <player-controls class="controls-container nicer-ux"
        [media]="media$ | async"
        [playing]="isPlayerPlaying$ | async"
        [isRepeat]="isPlayerInRepeat$ | async"
        (previous)="playPreviousTrack ()"
        (pause)="pauseVideo ()"
        (play)="playVideo ($event)"
        (next)="playNextTrack ()"
        (repeat)="toggleRepeat ()" >
      </player-controls>
    </div>
  </section>
  `,
  styleUrls: ['./app-player.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlayerComponent implements OnInit {
  isShowPlayer$       = this.store.pipe (select (AppTopLevelFRS.AppPlayerState.getShowPlayer));
  isPlayerFullscreen$ = this.store.pipe (select (AppTopLevelFRS.AppPlayerState.getPlayerFullscreen));

  media$              = this.store.pipe (select (AppTopLevelFRS.AppPlayerState.getCurrentMedia));
  playerState$        = this.store.pipe (select (AppTopLevelFRS.getFAppPlayerState));
  isPlayerPlaying$    = this.store.pipe (select (AppTopLevelFRS.AppPlayerState.getIsPlayerPlaying));
  isPlayerInRepeat$   = this.store.pipe (select (AppTopLevelFRS.NowPlaylistState.isPlayerInRepeat));

  @HostBinding ('class.youtube-player') style = true;

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private appPlayerApi: AppPlayerApi
    , private nowPlaylistService: NowPlaylistService
    , private nowPlaylistEffects: NowPlaylistEffects
  ) {
  }//e constructor


  ngOnInit () {
    this.appPlayerApi.resetPlayer ();
    this.nowPlaylistEffects.loadNextTrackE1R1$
      .subscribe ((action: any) => this.playVideo (action.payload));
  }//e ngOnInit


  setupPlayer (player) {
    this.appPlayerApi.setupPlayer (player);
  }//e setupPlayer


  changePlayerState (event) {
    this.appPlayerApi.changePlayerState (event);
  }//e changePlayerState


  togglePlayer () {
    this.appPlayerApi.togglePlayer ();
  }//e togglePlayer


  toggleFullscreen () {
    this.appPlayerApi.toggleFullscreen ();
  }//e toggleFullscreen


  playPreviousTrack () {
    this.nowPlaylistService.selectPreviousIndex ();
    this.playVideo (this.nowPlaylistService.getCurrent ());
  }//e playPreviousTrack


  pauseVideo () {
    this.appPlayerApi.pauseVideo ();
  }//e pauseVideo


  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo (media);
  }//e playVideo


  playNextTrack () {
    this.nowPlaylistService.selectNextIndex ();
    this.playVideo (this.nowPlaylistService.getCurrent ());
  }//e playNextTrack


  toggleRepeat () {
    this.appPlayerApi.toggleRepeat ();
  }//e toggleRepeat
}
//e class
