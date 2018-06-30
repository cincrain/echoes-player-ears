import { Action } from '@ngrx/store';


export enum ActionTypes {
  UPDATE_FILTER             = '[PlayerSearch] update filter',
  UPDATE_QUERY_PARAM        = '[PlayerSearch] update query param',
  UPDATE_QUERY              = '[PlayerSearch] update query',
  SEARCH_NEW_QUERY          = '[PlayerSearch] search new query',
  SEARCH_MORE_FOR_QUERY     = '[PlayerSearch] search more for query',
  GET_SUGGESTIONS           = '[PlayerSearch] get suggestions',
  RESET_PAGE_TOKEN          = '[PlayerSearch] reset page token',
  SEARCH_RESULTS_RETURNED   = '[PlayerSearch] search results returned',
  SEARCH_CURRENT_QUERY      = '[PlayerSearch] search current query',
  SEARCH_STARTED            = '[PlayerSearch] search started',
  UPDATE_SEARCH_TYPE        = '[PlayerSearch] update search type',
  ADD_PLAYLISTS_TO_RESULTS  = '[PlayerSearch] add playlists to results',
  ADD_METADATA_TO_VIDEOS    = '[PlayerSearch] add metadata to videos',
  START_PLAYLISTS_SEARCH    = '[PlayerSearch] start playlists search',
  ADD_RESULTS               = '[PlayerSearch] add results',
  RESET_RESULTS             = '[PlayerSearch] reset results',
  ERROR_RESULTS             = '[PlayerSearch] error results'
}
//e enum


export class UpdateFilterE0R0 implements Action {
  readonly type = ActionTypes.UPDATE_FILTER;
  constructor (public payload = '') {}
}
export class UpdateQueryParamE2R1 implements Action {
  readonly type = ActionTypes.UPDATE_QUERY_PARAM;
  constructor (public payload: any) {}
}
export class UpdateQueryE0R1 implements Action {
  readonly type = ActionTypes.UPDATE_QUERY;
  constructor (public payload: string) {}
}
export class SearchNewQueryE2R1 implements Action {
  readonly type = ActionTypes.SEARCH_NEW_QUERY;
  constructor (public payload: string) {}
}
export class SearchMoreForQueryE2R0 implements Action {
  readonly type = ActionTypes.SEARCH_MORE_FOR_QUERY;
  constructor (public payload = '') {}
}
export class GetSuggestionsE0R0 implements Action {
  readonly type = ActionTypes.GET_SUGGESTIONS;
  constructor (public payload: string) {}
}
export class ResetPageTokenE1R0 implements Action {
  readonly type = ActionTypes.RESET_PAGE_TOKEN;
  constructor (public payload = '') {}
}
export class SearchResultsReturnedE1R1 implements Action {
  readonly type = ActionTypes.SEARCH_RESULTS_RETURNED;
  constructor (public payload: any) {}
}
export class SearchCurrentQueryE1R0 implements Action {
  readonly type = ActionTypes.SEARCH_CURRENT_QUERY;
  constructor (public payload = '') {}
}
export class SearchStartedE0R1 implements Action {
  readonly type = ActionTypes.SEARCH_STARTED;
  constructor (public payload = '') {}
}
export class UpdateSearchTypeE0R1 implements Action {
  readonly type = ActionTypes.UPDATE_SEARCH_TYPE;
  constructor (public payload: string) {}
}
export class AddPlaylistsToResultsE1R0 implements Action {
  readonly type = ActionTypes.ADD_PLAYLISTS_TO_RESULTS;
  constructor (public payload: any) {}
}
export class AddMetadataToVideosE1R0 implements Action {
  readonly type = ActionTypes.ADD_METADATA_TO_VIDEOS;
  constructor (public payload: any) {}
}
export class StartPlaylistsSearchE2R1 implements Action {
  readonly type = ActionTypes.START_PLAYLISTS_SEARCH;
  constructor (public payload = '') {}
}
export class AddResultsE0R1 implements Action {
  readonly type = ActionTypes.ADD_RESULTS;
  constructor (public payload: GoogleApiYouTubeVideoResource[]) {}
}
export class ResetResultsE0R1 implements Action {
  readonly type = ActionTypes.RESET_RESULTS;
  constructor (public payload = '') {}
}
export class ErrorResultsE0R1 implements Action {
  readonly type = ActionTypes.ERROR_RESULTS;
  constructor (public payload: any) {}
}
//enclass
export type Actions =
  | UpdateFilterE0R0
  | UpdateQueryParamE2R1
  | UpdateQueryE0R1
  | SearchNewQueryE2R1
  | SearchMoreForQueryE2R0
  | GetSuggestionsE0R0
  | ResetPageTokenE1R0
  | SearchResultsReturnedE1R1
  | SearchCurrentQueryE1R0
  | SearchStartedE0R1
  | UpdateSearchTypeE0R1
  | AddPlaylistsToResultsE1R0
  | AddMetadataToVideosE1R0
  | StartPlaylistsSearchE2R1
  | AddResultsE0R1
  | ResetResultsE0R1
  | ErrorResultsE0R1;
//e type
