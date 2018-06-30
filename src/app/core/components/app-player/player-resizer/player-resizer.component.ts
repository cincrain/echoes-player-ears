import { 
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy
} from '@angular/core';


@Component ({
  selector: 'player-resizer',
  template: `
  <button class="btn btn-sm navbar-btn show-player pull-right"
    title="minimize / maximize player"
    [class.full-screen]="!fullscreen"
    (click)="handleTogglePlayer ()" >
    <icon name="chevron-down" class="icon-minimize"></icon>
    <icon name="expand" class="icon-max"></icon>
  </button>
  `,
  styleUrls: ['./player-resizer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerResizerComponent implements OnInit {
  @Input  () fullscreen: boolean;
  @Output () toggle    = new EventEmitter<void> ();

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  handleTogglePlayer () {
    this.toggle.next ();
  }//e handleTogglePlayer
}
//e class
