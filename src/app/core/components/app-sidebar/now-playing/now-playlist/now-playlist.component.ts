import { Component, OnInit, Input, Output, ChangeDetectionStrategy
  , EventEmitter, NgZone, OnChanges, SimpleChanges
  , ViewEncapsulation, AfterViewChecked
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { flyOut } from '@shared/animations/fade-in.animations';
import * as NowPlaylistARS from '@store/now-playlist/index';
import { isNewChange } from '@shared/utils/data.utils';


@Component ({
  selector: 'now-playlist',
  template: `
  <section class="now-playlist ux-maker">
    <ul class="nav nav-list ux-maker nicer-ux">
      <li class="now-playlist-track" #playlistTrack
        [ngClass]="{ 'active': isActiveMedia (video.id, playlistTrack) }"
        *ngFor="let video of nowPlaylistState.videos | search:nowPlaylistState.filter; let index = index"
        [@flyOut] >
        <now-playlist-track
          [video]="video" [index]="index"
          (select)="selectVideo (video)"
          (selectTrack)="selectTrackInVideo ($event)"
          (remove)="removeVideo ($event)" >
        </now-playlist-track>
      </li>
    </ul>
  </section>
  `,  
  styleUrls: ['./now-playlist.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [flyOut]
})
export class NowPlaylistComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input  () nowPlaylistState: NowPlaylistARS.INowPlaylistState;
  @Output () select          = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () selectTrack     = new EventEmitter<{
    time:    string;
    media:   GoogleApiYouTubeVideoResource;
  }> ();
  @Output () remove          = new EventEmitter<GoogleApiYouTubeVideoResource> ();

  public activeTrackElement: HTMLUListElement;
  public hasActiveChanged    = false;

  constructor (private zone: NgZone) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  ngOnChanges ({ activeId }: SimpleChanges) {
    if (activeId) {
      this.hasActiveChanged = isNewChange (activeId);
    }
  }//e ngOnChanges


  ngAfterViewChecked () {
    if (this.hasActiveChanged && this.activeTrackElement) {
      this.zone.runOutsideAngular (() => this.scrollToActiveTrack ());
    }
  }//e ngAfterViewChecked


  scrollToActiveTrack () {
    if (this.activeTrackElement) {
      this.activeTrackElement.scrollIntoView ();
    }
  }//e scrollToActiveTrack


  isActiveMedia (mediaId: string, trackElement: HTMLUListElement) {
    const isActive  = this.nowPlaylistState.selectedId === mediaId;
    if (isActive) {
      this.activeTrackElement = trackElement;
    }
    return isActive;
  }//e isActiveMedia


  selectVideo (media: GoogleApiYouTubeVideoResource) {
    this.select.emit (media);
  }//e selectVideo


  selectTrackInVideo (trackEvent: { time; media }) {
    this.selectTrack.emit (trackEvent);
  }//e selectTrackInVideo


  removeVideo (media: GoogleApiYouTubeVideoResource) {
    this.remove.emit (media);
  }//e removeVideo
}
//e class
