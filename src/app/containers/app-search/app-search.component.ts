import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as PlayerSearchARS from '@store/player-search/index';


@Component ({
  selector: 'app-search',
  template: `
  <article
    infiniteScroll
    [infiniteScrollDistance]="2"
    [infiniteScrollDisabled]="currentPlaylist$ | async"
    [immediateCheck]="true"
    [scrollWindow]="false"
    (scrolled)="searchMore ()" >
    <app-navbar>

      <div class="navbar-header">
        <player-search
          [query]="query$ | async"
          (queryChange)="resetPageToken ($event)"
          (search)="search ($event)" >
        </player-search>
      </div>
      <button-group class="nav-toolbar"
        [buttons]="presets$ | async"
        [selectedButton]="queryParamPreset$ | async"
        (buttonClick)="updatePreset ($event)" >
      </button-group>    
      <search-navigator></search-navigator>
      
    </app-navbar>

    <router-outlet></router-outlet>
  </article>
  `,
  styleUrls: ['./app-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSearchComponent implements OnInit {
  currentPlaylist$  = this.store.pipe (select (AppTopLevelFRS.UserProfileState.getViewedPlaylist));
  query$            = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getQuery));
  queryParamPreset$ = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getQueryParamPreset));
  presets$          = this.store.pipe (select (AppTopLevelFRS.PlayerSearchState.getPresets));

  constructor (private store: Store<AppTopLevelFRS.IEchoesState>) {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  searchMore () {
    this.store.dispatch (new PlayerSearchARS.SearchMoreForQueryE2R0 ());
    console.log ([`★★-->> [${Date ()}`
                , `   -->> app-search.component.ts # searchMore(ln:54+-)`
                , `   -->> passed through... `]
                .join('\n') );
    
  }//e searchMOre


  resetPageToken (query: string) {
    this.store.dispatch (new PlayerSearchARS.ResetPageTokenE1R0 ());
    this.store.dispatch (new PlayerSearchARS.UpdateQueryE0R1 (query));
  }//e resetPageToken

  
  search (query: string) {
    if (!query.hasOwnProperty ('isTrusted')) {
      this.store.dispatch (new PlayerSearchARS.SearchNewQueryE2R1 (query));
    }
  }//e search


  updatePreset (preset: PlayerSearchARS.IPresetParam) {
    this.store.dispatch (
      new PlayerSearchARS.UpdateQueryParamE2R1 ({ preset: preset.value })
    );
  }//e updatePreset
}
//e class
