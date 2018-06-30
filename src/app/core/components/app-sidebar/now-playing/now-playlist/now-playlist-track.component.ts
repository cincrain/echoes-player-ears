import { Component, OnInit, Input, Output, ChangeDetectionStrategy
  , EventEmitter, AfterContentInit
} from '@angular/core';
import { MediaParserService } from '@core/services/index';


@Component ({
  selector: 'now-playlist-track',
  template: `
  <div class="now-playlist-track__trigger">
    <div class="track-contents">
      <section class="video-thumb playlist-track__thumb"
        (click)="handleMarkSelected (video)" >
        <span class="track-number">{{ index + 1 }}</span>
        <img src="{{ video | videoToThumb }}"
          class="video-thumb__image"
          draggable="false" xtitle="Drag to sort" >
        <span class="badge badge-info">
          {{ video.contentDetails.duration | toFriendlyDuration }}
        </span>
      </section>

      <section class="video-title"
        (click)="handleMarkSelected (video)"
        [tooltip]="video.snippet.title" >
        {{ video.snippet.title }}
      </section>
    </div>

    <aside class="playlist-track__content">
      <section class="track-actions">
        <button class="btn label btn-primary playlist-track"
          tooltip="Album Track - click to select cued tracks"
          *ngIf="isPlaylistMedia (video)" 
	  (click)="handleToggleTracks ($event, video)" >
          <icon name="list-ul"></icon>
        </button>
        <button class="btn label btn-info playlist-track"
          tooltip="More information for this media"
          (click)="handleToggleInfo ()" >
          <icon name="info-circle"></icon>
        </button>
      </section>
      <span class="label label-danger ux-maker remove-track"
        tooltip="Remove From Playlist"
        (click)="remove.emit (video)" >
        <icon name="trash"></icon>
      </span>
    </aside>

    <article *ngIf="displayTracks" class="track-tracks list-group">
      <aside class="album-tracks-heading">Tracks</aside>
      <button type="button" class="list-group-item btn-transparent"
        *ngFor="let track of tracks | parseTracks"
        (click)="handleSelectTrack ($event, track, video)" >
        {{ track }}
      </button>
    </article>

    <article *ngIf="displayInfo" class="track-info">
      {{ video.snippet.description }}
    </article>
  </div>
  `,
  styleUrls: ['./now-playlist-track.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistTrackComponent implements OnInit, AfterContentInit {
  @Input  () video:      GoogleApiYouTubeVideoResource;
  @Input  () index:      number;
  @Output () select      = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () selectTrack = new EventEmitter<{
    time:    string;
    media:   GoogleApiYouTubeVideoResource;
  }> ();
  @Output () remove      = new EventEmitter<GoogleApiYouTubeVideoResource> ();

  displayTracks          = false;
  displayInfo            = false;
  tracks:                string[] = [];
  hasTracks              = false;
  private parsedTracks   = false;

  constructor (private mediaParserService: MediaParserService) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  ngAfterContentInit () {
    this.extractTracks (this.video);
  }//e ngAfterContentInit


  extractTracks (media: GoogleApiYouTubeVideoResource) {
    if (!this.parsedTracks) {
      const tracks = this.mediaParserService.extractTracks (media);
      if (Array.isArray (tracks)) {
        this.parsedTracks = true;
        this.tracks       = tracks;
        this.hasTracks    = true;
      }
    }
  }//e extrackTracks


  isPlaylistMedia (media: GoogleApiYouTubeVideoResource) {
    return this.hasTracks;
  }//e isPlaylistMedia


  handleMarkSelected (video: GoogleApiYouTubeVideoResource) {
    this.select.emit (video);
  }//e handleMarkSelected


  toggleTracks (media: GoogleApiYouTubeVideoResource) {
    this.displayTracks = !this.displayTracks;
    return this.displayTracks;
  }//e toggleTracks


  handleToggleTracks (event: Event, media: GoogleApiYouTubeVideoResource) {
    event.stopImmediatePropagation ();
    this.toggleTracks (media);
  }//e handleToggleTracks


  handleSelectTrack (
    $event:   Event,
    track:    string,
    media:    GoogleApiYouTubeVideoResource
  ) {
    $event.stopImmediatePropagation ();
    const time = this.mediaParserService.extractTime (track);
    if (time) {
      this.selectTrack.emit ({ time: time[0], media });
    }
  }//e handleSelectTrack


  handleToggleInfo () {
    this.displayInfo = !this.displayInfo;
    return this.displayInfo;
  }//e handleToggleInfo
}
//e class
