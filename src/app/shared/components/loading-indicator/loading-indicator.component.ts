import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';


@Component ({
  selector: 'loader',
  template: `
  <div class="alert  alert-info">
    <icon name="circle-o-notch.spin"></icon>
    {{ message }}
  </div>
  `,
  styleUrls: ['./loading-indicator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent implements OnInit {
  @Input  () message = '';
  @Input  () loading = false;

  @HostBinding ('class.show-loader')
  get show () {
    return this.loading;
  }//e show

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit
}
//e class
