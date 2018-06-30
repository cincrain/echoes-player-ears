import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy
} from '@angular/core';


@Component ({
  selector: 'playlist-cover',
  template: `
  <div class="playlist-cover clearfix">
    <div class="cover-bg"
      [ngStyle]="{ 'background-image': 'url(' + thumbUrl + ')' }" >
    </div>
    <div class="btn btn-transparent playlist-thumbnail">
      <img [src]="thumbUrl">
    </div>
    <div class="actions">
      <button class="btn btn-lg ux-maker play-media bg-primary"
        (click)="play.emit (playlist)" title="play playlist" >
        <icon name="play"></icon>
      </button>
      <button class="btn btn-lg ux-maker play-media bg-primary"
        (click)="queue.emit (playlist)" title="queue playlist" >
        <icon name="share"></icon>
      </button>
    </div>
  </div>
  `,
  styleUrls: ['./playlist-cover.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistCoverComponent implements OnInit {
  @Input  () playlist: GoogleApiYouTubePlaylistResource;
  @Output () play    = new EventEmitter<GoogleApiYouTubePlaylistResource> ();
  @Output () queue   = new EventEmitter<GoogleApiYouTubePlaylistResource> ();

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  get title () {
    return this.playlist && this.playlist.snippet
      ? this.playlist.snippet.title
      : '...';
  }//e title


  get total () {
    return this.playlist && this.playlist.contentDetails
      ? this.playlist.contentDetails.itemCount
      : '...';
  }//e total


  get thumbUrl () {
    const thumbnails = this.playlist && this.playlist.snippet.thumbnails;
    const sizes      = ['default', 'medium'];
    return sizes.reduce ((acc, size) =>
      thumbnails.hasOwnProperty (size) && thumbnails[size].url
      , ''
    );
  }//e thumbUrl
}
//e class
