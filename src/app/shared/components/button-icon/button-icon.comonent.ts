import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';


@Component ({
  selector: 'button-icon',
  template: `
  <button [ngClass]="types">
    <icon [name]="icon"></icon>
    <ng-content></ng-content>  
  </button>
  `,
  styleUrls: ['./button-icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonIconComponent implements OnInit {
  @Input  () icon:   string;
  @Input  () types:  string;

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit
}
//e class
