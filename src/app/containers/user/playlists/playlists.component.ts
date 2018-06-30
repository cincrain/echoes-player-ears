import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import { UserPlayerService } from '../user-player.service';


@Component ({
  selector: 'playlists',
  template: `
  <section class="videos-list">
    <div class="list-unstyled ux-maker youtube-items-container clearfix">
      <youtube-playlist
        *ngFor="let playlist of playlists$ | async"
        link="/user"
        [media]="playlist"
        (play)="playSelectedPlaylist (playlist)"
        (queue)="queueSelectedPlaylist (playlist)" >
      </youtube-playlist>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistsComponent implements OnInit {
  playlists$ = this.store.pipe (select (AppTopLevelFRS.UserProfileState.getPlaylists));

  constructor (
    private store: Store<AppTopLevelFRS.IEchoesState>
    , private userPlayerService: UserPlayerService
  ) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  playSelectedPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.userPlayerService.playSelectedPlaylist (playlist);
  }//e playSelectedPlaylist


  queueSelectedPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.userPlayerService.queuePlaylist (playlist);
  }//e queueSelectedPlaylist
}
//e class
