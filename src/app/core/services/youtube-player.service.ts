import { Injectable, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
// import { IEchoesState } from '@store/freducers-selectors';


@Injectable ()
export class YoutubePlayerService {
  public player: YT.Player;

  constructor (
    // private store: Store<IEchoesState>
    private zone: NgZone
  ) {
  }//e constructor


  setupPlayer (player) {
    this.player = player;
  }//e setupPlayer


  play () {
    this.zone.runOutsideAngular (() => this.player.playVideo ());
  }//e play


  pause () {
    this.zone.runOutsideAngular (() => this.player.pauseVideo ());
  }//e pause


  playVideo (media: GoogleApiYouTubeVideoResource, seconds?: number) {
    const id        = media.id;
    const isLoaded  = this.player.getVideoUrl ().includes (id);
    if (!isLoaded) {
      this.zone.runOutsideAngular (() => 
        this.player.loadVideoById (id, seconds || undefined)
      );
    }
    this.play ();
  }//e playVideo


  seekTo (seconds: number) {
    this.zone.runOutsideAngular (() => this.player.seekTo (seconds, true));
  }//e seekTo


  setSize (height, width) {
    this.zone.runOutsideAngular (() => 
      this.player.setSize (width, height)
    );
  }//e setSize
}
//e constructor
