import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as NowPlaylistARS from '@store/now-playlist/index';
import * as AppPlayerARS from '@store/app-player/index';

import { NowPlaylistComponent } from './now-playlist/index';
import { NowPlaylistService } from '@core/services/index';
import { Observable } from 'rxjs';


@Component ({
  selector: 'now-playing',
  template: `
  <div class="sidebar-pane">
    <now-playlist-filter
      [nowPlaylistState]="nowPlaylistState$ | async"
      (clear)="clearPlaylist ()"
      (filter)="updateFilter ($event)"
      (reset)= "resetFilter ()"
      (headerClick)="onHeaderClick ()" >
    </now-playlist-filter>

    <now-playlist
      [nowPlaylistState]="nowPlaylistState$ | async"
      (select)="selectVideo ($event)"
      (selectTrack)="selectTrackInVideo ($event)"
      (remove)="removeVideo ($event)" >
    </now-playlist>
  </div>
  `,
  styleUrls: ['./now-playing.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlayingComponent implements OnInit {
  public nowPlaylistState$: Observable<NowPlaylistARS.INowPlaylistState>;
  @ViewChild (NowPlaylistComponent) nowPlaylistComponent: NowPlaylistComponent;

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private nowplaylistService: NowPlaylistService
  ) {
  }//e constructor


  ngOnInit () {
    this.nowPlaylistState$ = this.nowplaylistService.nowPlaylistState$;
  }//e ngOnInit


  clearPlaylist () {
    this.nowplaylistService.clearPlaylist ();
  }//e clearPlaylist


  updateFilter (searchFilter: string) {
    this.nowplaylistService.updateFilter (searchFilter);
  }//e updateFilter


  resetFilter () {
    this.nowplaylistService.updateFilter ('');
  }//e resetFilter


  onHeaderClick () {
    this.nowPlaylistComponent.scrollToActiveTrack ();
  }//e onHeaderClick


  selectVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch (new AppPlayerARS.PlayE1R1 (media));
    this.nowplaylistService.updateIndexByMedia (media.id);
  }//e selectVideo


  selectTrackInVideo (trackEvent: { time: string; media: GoogleApiYouTubeVideoResource }) {
    this.store.dispatch (new AppPlayerARS.PlayE1R1 (trackEvent.media));
    this.nowplaylistService.seekToTrack (trackEvent);
  }//e selectTrackInVideo


  removeVideo (media) {
    this.nowplaylistService.removeVideo (media);
  }//e removeVideo
}
//e class
