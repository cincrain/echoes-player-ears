import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';


@Component ({
  selector: 'youtube-playlist',
  template: `
  <div class="youtube-playlist-item ux-maker card">
    <section class="media-title front">
      <div class="media-thumb"
        [tooltip]="media.snippet.title" >
        <div class="thumbnail is-rounded">
          <img src="{{ media | videoToThumb }}" class="thumb-image">
        </div>
        <button class="btn btn-default btn-lg play-media"
          (click)="handlePlayPlaylist (media)" >
          <icon name="play"></icon>
        </button>
      </div>

      <section class="item-actions is-absolute is-rounded-bottom">
        <a class="playlist-link"
          [routerLink]="[ link + '/playlist', media.id ]"
          [tooltip]="media.snippet.title"
          (click)="handleNavigateToPlaylist ()" >
          <h4 class="title ellipsis">
            <icon name="th-large"></icon> ({{ media.contentDetails.itemCount }}) {{ media.snippet.title }}
          </h4>
          <icon name="refresh 2x spin" *ngIf="loading" class="loader"></icon>
        </a>
      </section>
    </section>
  </div>
  `,
  styleUrls: ['./youtube-playlist.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylistComponent {
  @Input  () media:   GoogleApiYouTubePlaylistResource;
  @Input  () link     = './';
  @Output () play     = new EventEmitter ();
  @Output () queue    = new EventEmitter ();

  isPlaying  = false;
  loading    = false;

  constructor () {
  }//e constructor


  handlePlayPlaylist (media: GoogleApiYouTubePlaylistResource) {
    this.play.next (media);
  }//e handlePlayPlaylist


  handleQueuePlaylist (media: GoogleApiYouTubePlaylistResource) {
    this.queue.next (media);
  }//e handleQueuePlaylist


  handleNavigateToPlaylist () {
    this.loading = true;
  }//e handleNavigateToPlaylist
}
//e class
