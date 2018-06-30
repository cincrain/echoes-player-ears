import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';


@Component ({
  selector: 'playlist-viewer',
  template: `
  <playlist-cover
    [playlist]="playlist"
    (play)="onPlayPlaylist ($event)"
    (queue)="onQueuePlaylist ($event)" >
  </playlist-cover>
  <section>
    <youtube-list
      [list]="videos"
      [queued]="queuedPlaylist"
      (play)="onPlayVideo ($event)"
      (queue)="onQueueVideo ($event)"
      (unqueue)="onUnqueueVideo ($event)" >
    </youtube-list>
  </section>  
  `,
  styleUrls: ['./playlist-viewer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistViewerComponent implements OnInit {
  @Input  () videos:         GoogleApiYouTubeVideoResource[] = [];
  @Input  () playlist:       GoogleApiYouTubePlaylistResource;
  @Input  () queuedPlaylist  = [];
  @Output () playPlaylist    = new EventEmitter<GoogleApiYouTubePlaylistResource> ();
  @Output () queuePlaylist   = new EventEmitter<GoogleApiYouTubePlaylistResource> ();
  @Output () playVideo       = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () queueVideo      = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () unqueueVideo    = new EventEmitter<GoogleApiYouTubeVideoResource> ();

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  onPlayPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.playPlaylist.emit (playlist);
  }//e onPlayPlaylist


  onQueuePlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.queuePlaylist .emit (playlist);
  }//e onQueuePlaylist


  onPlayVideo (media: GoogleApiYouTubeVideoResource) {
    this.playVideo.emit (media);
  }//e onPlayVideo


  onQueueVideo (media: GoogleApiYouTubeVideoResource) {
    this.queueVideo.emit (media);
  }//e onQueueVideo


  onUnqueueVideo (media: GoogleApiYouTubeVideoResource) {
    this.unqueueVideo.emit (media);
  }//e onUnqueueVideo
}
//e class
