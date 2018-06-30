import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as PlayerSearchARS from '@store/player-search/index';

import { YoutubeVideosInfoService, YoutubeSearchService } from '@core/services/index';
import { toPayload } from '@shared/utils/data.utils';
import { of } from 'rxjs';
import {
  filter, map, mergeMap, switchMap, withLatestFrom, tap, catchError
} from 'rxjs/operators';


@Injectable ()
export class PlayerSearchEffects {
  constructor (
    private actions$: Actions
    , private store: Store<AppTopLevelFRS.IEchoesState>
    , private youtubeVideosInfoService: YoutubeVideosInfoService
    , private youtubeSearchService: YoutubeSearchService
  ) {
  }//e constructor


  @Effect ()
  searchMoreForQueryE2R0_1st__from_searchMore_in_AppSearchComponent$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.SEARCH_MORE_FOR_QUERY)
    , map (toPayload)
    , withLatestFrom (this.store)
    , map ((latest: any[]) => latest[1])
    , filter ((store: AppTopLevelFRS.IEchoesState) => !store.search.isSearching)
    , mergeMap ((store: AppTopLevelFRS.IEchoesState) => {
        this.youtubeSearchService.searchMore (store.search.pageToken.next);
        return this.youtubeSearchService.searchFor (
          store.search.searchType
          , store.search.query
          , store.search.queryParams
        )
        .pipe (
          map (youtubeRes => 
            new PlayerSearchARS.SearchResultsReturnedE1R1 (youtubeRes)
          )
        );
    })
  );
  //e searchMoreForQueryE2R0_1st


  @Effect ()
  searchMoreForQueryE2R0_2nd__from_searchMore_in_AppSearchComponent$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.SEARCH_MORE_FOR_QUERY)
    , map (toPayload)
    , withLatestFrom (this.store.select (AppTopLevelFRS.PlayerSearchState.getIsSearching))
    , filter ((states: [any, boolean]) => !states[1])
    , map (() => new PlayerSearchARS.SearchStartedE0R1 ())
  );
  //e searchMoreForQueryE2R0_2nd
  
  
  @Effect ()
  searchResultsReturnedE1R1_asaresult_searchNewQueryE2R1_in_place$
  // searchMoreForQueryE2R0_1st__from_searchMore_in_AppSearchComponent$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.SEARCH_RESULTS_RETURNED)
    , map (toPayload)
    , withLatestFrom (this.store.select (AppTopLevelFRS.PlayerSearchState.getSearchType))
    , map ((states: [any[], string]) => {
        if (states[1] === PlayerSearchARS.CSearchTypes.VIDEO) {
          return new PlayerSearchARS.AddMetadataToVideosE1R0 (states[0]);
        }
        return new PlayerSearchARS.AddPlaylistsToResultsE1R0 (states[0]);
    })
  );
  //e searchResultsReturnedE1R1


  @Effect ()
  addPlaylistsToResultsE1R0__asaresult_searchResultsReturnedE1R1_in_place$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.ADD_PLAYLISTS_TO_RESULTS)
    , map (toPayload)
    , map (result => new PlayerSearchARS.AddResultsE0R1 (result.items))
  );
  //e addPlaylistsToResultsE1R0


  @Effect ()
  addMetadataToVideosE1R0__asaresult_searchResultsReturnedE1R1_in_place$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.ADD_METADATA_TO_VIDEOS)
    , map (toPayload)
    , map ((medias: { items: GoogleApiYouTubeSearchResource[] }) =>
        medias.items.map (media => media.id.videoId).join (',')
    )
    , mergeMap ((mediaIds: string) =>
        this.youtubeVideosInfoService.fetchVideosData (mediaIds).pipe (
          map ((videos: any) => new PlayerSearchARS.AddResultsE0R1 (videos))
        )
    )
  );
  //e addMetadataToVideosE1R0


  @Effect ()
  resetPageTokenE1R0__from_resetPageToken_in_AppSearchComponent$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.RESET_PAGE_TOKEN)
    , map (toPayload)
    , mergeMap (() => of (this.youtubeSearchService.resetPageToken ()))
    , map (() => ({ type: 'PAGE_RESET_DONE' }))
  );
  //e resetPageTokenE1R0


  @Effect ()
  searchNewQueryE2R1_1st__from_search_in_AppSearchComponent$
  // __asaresult_searchCurrentQueryE1R0_in_place
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.SEARCH_NEW_QUERY)
    , map (toPayload)
    , withLatestFrom (this.store)
    , map ((latest: any[]) => latest[1])
    , switchMap ((store: AppTopLevelFRS.IEchoesState) => 
        this.youtubeSearchService.resetPageToken ()
        .searchFor (
          store.search.searchType
          , store.search.query
          , store.search.queryParams
        )
        .pipe (
          map (youtubeRes => 
            new PlayerSearchARS.SearchResultsReturnedE1R1 (youtubeRes)
          )
          , catchError (err => of (new PlayerSearchARS.ErrorResultsE0R1 (err)))
        )
    )
  );
  //e searchNewQueryE2R1_1st


  @Effect ()
  searchNewQueryE2R1_2nd__from_search_in_AppSearchComponent$
  // startPlaylistsSearchE2R1_1st__from_ngOnInit_in_YoutubePlaylistsComponent$
  = this.actions$.pipe (
    ofType (
      PlayerSearchARS.ActionTypes.SEARCH_NEW_QUERY
      , PlayerSearchARS.ActionTypes.START_PLAYLISTS_SEARCH
    )
    , map (() => new PlayerSearchARS.ResetResultsE0R1 ())
  );
  //e searchNewQueryE2R1_2nd

  
  @Effect ()
  updateQueryParamE2R1_1st__from_updatePreset_in_AppSearchComponent$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.UPDATE_QUERY_PARAM)
    , map (() => new PlayerSearchARS.SearchCurrentQueryE1R0 ())
  );
  //e updateQueryParamE2R1_1st


  @Effect ()
  searchCurrentQueryE1R0__asaresult_updateQueryParamE2R1_in_place$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.SEARCH_CURRENT_QUERY)
    , map (toPayload)
    , withLatestFrom (this.store.select (AppTopLevelFRS.PlayerSearchState.getQuery))
    , map ((latest: any[]) => latest[1])
    , map ((query: string) => new PlayerSearchARS.SearchNewQueryE2R1 (query))
  );
  //e searchCurrentQueryE1R0


  @Effect ()
  updateQueryParamE2R1_2nd__from_updatePreset_in_AppSearchComponent$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.UPDATE_QUERY_PARAM)
    , map (() => new PlayerSearchARS.ResetResultsE0R1 ())
  );
  //e updateQueryParamE2R1_2nd


  @Effect ()
  startPlaylistsSearchE2R1_2nd__from_ngOnInit_in_YoutubePlaylistsComponent$
  = this.actions$.pipe (
    ofType (PlayerSearchARS.ActionTypes.START_PLAYLISTS_SEARCH)
    , withLatestFrom (this.store)
    , map ((latest: any[]) => latest[1])
    , switchMap ((store: AppTopLevelFRS.IEchoesState) =>
        this.youtubeSearchService.searchForPlaylist (
          store.search.query
          , store.search.queryParams
        )
        .pipe (
          map ((youtubeRes: any) =>
            new PlayerSearchARS.AddResultsE0R1 (youtubeRes.items)
          )
          , catchError (err => of (new PlayerSearchARS.ErrorResultsE0R1 (err)))
        )  
    )
  );
  //e startPlaylistsSearchE2R1_2nd
}
//e class
