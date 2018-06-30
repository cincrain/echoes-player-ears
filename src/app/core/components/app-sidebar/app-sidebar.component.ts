import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppSidebarProxy } from './app-sidebar.proxy';


@Component ({
  selector: 'app-sidebar',
  template: `
  <div id="sidebar" class="sidebar un-maker"
    [class.closed]="sidebarCollapsed$ | async" >
    <div class="sidebar-backdrop"
      (click)="toggleSidebar ()" >
    </div>

    <nav class="navbar navbar-transparent">
      <app-brand></app-brand>
      <app-navigator
        [closed]="sidebarCollapsed$ | async"
        [searchType]="searchType$ | async" >
      </app-navigator>
    </nav>
    <now-playing></now-playing>  

  </div>
  `,
  styleUrls: ['./app-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarComponent implements OnInit {
  sidebarCollapsed$ = this.appSidebarProxy.sidebarCollapsed$;
  searchType$       = this.appSidebarProxy.searchType$;

  constructor (private appSidebarProxy: AppSidebarProxy) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  toggleSidebar () {
    this.appSidebarProxy.toggleSidebar ();
  }//e toggleSidebar
}
//e class
