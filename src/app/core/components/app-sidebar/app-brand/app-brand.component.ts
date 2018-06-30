import { Component, OnInit } from '@angular/core';
import { AppApi } from '@core/api/index';


@Component ({
  selector: 'app-brand',
  template: `
  <div class="brand-container bg-primary"
    (click)="toggleSidebar ()" >
    <section class="brand-text">
      <h3 class="text brand-text-item">Ech</h3>
      <h3 class="brand-icon brand-text-item"
        appIcon name="headphones" >
      </h3>
      <h3 class="text brand-text-item">es</h3>
    </section>

    <button class="btn btn-transparent sidebar-toggle">
      <icon name="bars 2x"></icon>
    </button>
  </div>  
  `,
  styleUrls: ['./app-brand.scss']
})
export class AppBrandComponent implements OnInit {
  constructor (private appApi: AppApi) {
  }//e constructor


  ngOnInit () {
  }//e ngOnInit


  toggleSidebar () {
    return this.appApi.toggleSidebar ();
  }//e toggleSidebar
}
//e class
