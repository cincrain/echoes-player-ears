import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy, HostListener
} from '@angular/core';


@Component ({
  selector: 'media-info',
  template: `
  <article class="media-info ellipsis">
    <h3 class="yt-media-title ellipsis">
      <aside class="media-thumb-container pull-left"
        title="maximize / minimize"
        (click)="handleThumbClick ()" >
        <img src="{{ playerState?.media?.snippet?.thumbnails?.default?.url }}"
          class="media-thumb" >
        <icon name="arrows-alt" [class.invisible]="_minimized"></icon>
      </aside>
      <a class="title">{{ playerState?.media?.snippet?.title }}</a>
    </h3>
  </article>
  `,
  styleUrls: ['./media-info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaInfoComponent implements OnInit {
  @Input  () playerState: any = {};
  @Input  () minimized:   GoogleApiYouTubeVideoResource;
  @Output () thumbClick   = new EventEmitter ();

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  @HostListener ('window:keyup.Escape', ['$Event'])
  keyEvent (event: KeyboardEvent) {
    if (this.playerState.fullscreen.on) {
      this.handleThumbClick ();
    }
  }//e keyEvent


  handleThumbClick () {
    this.thumbClick.next ();
  }//e handleThumbClick


  get _minimized () {
    return !this.minimized.hasOwnProperty ('id');
  }//e _minimized
}
//e class
