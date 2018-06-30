import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistProxy } from './playlist-view.proxy';


@Component ({
  selector: 'playlist-view',
  template: `
  <article>
    <app-navbar [header]="header$ | async"
      [mainIcon]="'chevron-left'"
      (headerMainIconClick)="handleBack ()" >
    </app-navbar>

    <div class="row">
      <playlist-viewer class="clearfix"
        [videos]="videos$ | async"
        [playlist]="playlist$ | async"
        [queuedPlaylist]="nowPlaylistIds$ | async"
        (playPlaylist)="playPlaylist ($event)"
        (queuePlaylist)="queuePlaylist ($event)"
        (playVideo)="playVideo ($event)"
        (queueVideo)="queueVideo ($event)"
        (unqueueVideo)="unqueueVideo ($event)" >
      </playlist-viewer>
    </div>
  </article>
  `,
  styleUrls: ['./playlist-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistViewComponent implements OnInit {
  header$            = this.playlistProxy.fetchPlaylistHeader (this.route);
  videos$            = this.playlistProxy.fetchPlaylistVideos (this.route);
  playlist$          = this.playlistProxy.fetchPlaylist (this.route);
  nowPlaylistIds$    = this.playlistProxy.nowPlaylistIds$;

  constructor (
    private route: ActivatedRoute
    , private playlistProxy: PlaylistProxy
  ) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  playPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.playlistProxy.playPlaylist (playlist);
  }//e playPlaylist


  queuePlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.playlistProxy.queuePlaylist (playlist);
  }//e queuePlaylist


  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.playlistProxy.playVideo (media);
  }//e playVideo


  queueVideo (media: GoogleApiYouTubeVideoResource) {
    this.playlistProxy.queueVideo (media);
  }//e queueVideo


  unqueueVideo (media: GoogleApiYouTubeVideoResource) {
    this.playlistProxy.unqueueVideo (media);
  }//e unqueueVideo


  handleBack () {
    this.playlistProxy.goBack ();
  }//e handleBack
}
//e class
