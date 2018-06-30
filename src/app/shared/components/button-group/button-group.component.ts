import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy
} from '@angular/core';


export interface ButtonGroupButton {
  label:   string;
  value:   any;
}
//e interface


@Component ({
  selector: 'button-group',
  template: `
  <div class="btn-group btn-group-sm navbar-btn">
    <button class="btn btn-default"
      *ngFor="let button of buttons"
      [class.active]="isSelectedButton (button.value)"
      (click)="buttonClick.next (button)" >
      {{ button.label }}
    </button>
  </div>
  `,
  styleUrls: ['./button-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupComponent implements OnInit {
  @Input  () buttons:        ButtonGroupButton[];
  @Input  () selectedButton: string;
  @Output () buttonClick     = new EventEmitter<ButtonGroupButton> ();

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  isSelectedButton (buttonValue: string) {
    return buttonValue === this.selectedButton;
  }//e isSelectedButton
}
//e class
