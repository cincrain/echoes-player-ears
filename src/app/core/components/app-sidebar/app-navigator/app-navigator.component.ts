import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import * as PlayerSearchARS from '@store/player-search/index';


@Component ({
  selector: 'app-navigator',
  template: `
  <div class="list-group"
    [class.closed]="closed" >
    <button class="list-group-item ux-maker"
      *ngFor="let route of routes"
      (click)="go (route.link)" >
      <icon [name]="route.icon"></icon>
      <span class="text">{{ route.label }}</span>
    </button>
  </div>
  `,
  styleUrls: ['./app-navigator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent implements OnInit {
  @Input  () closed     = false;
  @Input  () searchType = PlayerSearchARS.CSearchTypes.VIDEO;

  public routes = [
    { link: '/search', icon: 'music', label: '검색' },
    { link: '/user',   icon: 'heart', label: '내영상' }
  ];

  constructor (
    private router: Router
  ) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  go (link) {
    if (link === '/user') {
      this.searchType = PlayerSearchARS.CSearchTypes.PLAYLIST;
    }
    this.router.navigate ([`${link}/${this.searchType}s`]);
  }//e go
}
//e class
