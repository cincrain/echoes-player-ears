import { Component, OnInit, Input, Output, ChangeDetectionStrategy
  , EventEmitter, ViewEncapsulation
} from '@angular/core';
import * as NowPlaylistARS from '@store/now-playlist/index';


@Component ({
  selector: 'now-playlist-filter',
  template: `
  <section class="nav-header user-playlists-filter">
    <span class="playlist-header"
      (click)="handleNowPlayingClick ()" >
      <icon name="play-circle-o" class="text-primary"></icon>
      <span class="text btn-transparent playlist-count"
        tooltip="Reveal now playing track" >
        Now Playing
        <span *ngIf="!isPlaylistEmpty ()">({{ playlistLength }})</span>
      </span>
    </span>

    <button class="btn btn-link btn-xs btn-clear"
      tooltip="Clear All Tracks In Now Playlist"
      [disabled]="isPlaylistEmpty ()"
      (click)="handleClearPlaylist ()" >
      <icon name="trash-o"></icon>
    </button>    

    <button class="btn btn-link btn-xs btn-save"
      title="Save All These Tracks To A New Playlist"
      disabled >
      <icon name="cloud-upload"></icon>
    </button>

    <div class="playlist-filter">
      <icon name="search" *ngIf="isFilterEmpty ()"></icon>
      <icon name="remove" class="text-danger"
        *ngIf="!isFilterEmpty ()"
        (click)="resetSearchFilter ()" >
      </icon>
      <input type="search" name="playlist-search"
        [value]="nowPlaylistState.filter"
        #searchFilter
        (input)="handleFilterChange (searchFilter.value)"
      >
    </div>
  </section>
  `,
  styleUrls: ['./now-playlist-filter.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistFilterComponent implements OnInit {
  @Input  () nowPlaylistState: NowPlaylistARS.INowPlaylistState;
  // @Output () save            = new EventEmitter ();
  @Output () clear           = new EventEmitter ();
  @Output () filter          = new EventEmitter ();
  @Output () reset           = new EventEmitter ();
  @Output () headerClick     = new EventEmitter ();

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  handleFilterChange (searchFilter: string) {
    this.filter.next (searchFilter);
  }//e handleFilterChange


  handleNowPlayingClick () {
    this.headerClick.next ();
  }//e handleNowPlayingClick


  isPlaylistEmpty () {
    return this.playlistLength === 0;
  }//e isPlaylistEmpty
  get playlistLength () {
    return this.nowPlaylistState.videos.length;
  }//e playlistLength


  handleClearPlaylist () {
    this.clear.next ('');
  }//e handleClearPlaylist


  isFilterEmpty () {
    return this.nowPlaylistState.filter === '';
  }//e isFilterEmpty


  resetSearchFilter () {
    this.reset.next ('');
  }//e resetSearchFilter
}
//e class
