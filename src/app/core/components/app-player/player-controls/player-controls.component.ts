import { Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy, HostBinding
} from '@angular/core';


@Component ({
  selector: 'player-controls',
  template: `
  <div class="btn-group player-controls">
    <button class="btn btn-default btn-lg navbar-btn"
      *ngFor="let control of controls"
      [title]="control.title"
      [ngClass]="[control.feature]"
      (click)="handleControl (control)" >
      <icon [name]="control.icon"></icon>
    </button>
  </div>
  `,
  styleUrls: ['./player-controls.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerControlsComponent implements OnInit {
  @Input  () media: GoogleApiYouTubeVideoResource;
  @HostBinding ('class.yt-repeat-on')
  @Input  () isRepeat = false;
  @HostBinding ('class.yt-playing')
  @Input  () playing  = false;

  @Output () play     = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () pause    = new EventEmitter ();
  @Output () previous = new EventEmitter ();
  @Output () next     = new EventEmitter ();
  @Output () repeat   = new EventEmitter ();

  controls = [
    {
      title:     'previous',
      icon:      'step-backward',
      handler:   this.handlePrevious,
      feature:   'previous'
    },
    {
      title:     'pause',
      icon:      'pause',
      handler:   this.handlePause,
      feature:   'pause'
    },
    {
      title:     'play',
      icon:      'play',
      handler:   this.handlePlay,
      feature:   'play'
    },
    {
      title:     'play next track',
      icon:      'step-forward',
      handler:   this.handleNext,
      feature:   'next'
    },
    {
      title:     'repeat playlist',
      icon:      'refresh',
      handler:   this.handleRepeat,
      feature:   'repeat'
    }
  ];

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  handlePrevious () {
    this.previous.emit ();
  }//e handlePrevious


  handlePause() {
    this.pause.emit ();
  }//e handlePause


  handlePlay () {
    this.play.emit (this.media);
  }//e handlePlay

  
  handleNext () {
    this.next.emit ();
  }//e handleNext


  handleRepeat () {
    this.repeat.emit ();
  }//e handleRepeat


  handleControl (control) {
    control.handler.call (this);
  }//e handleControl
}
//e class
