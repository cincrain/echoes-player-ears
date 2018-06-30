import { ActionTypes, Actions } from './player-search.actions';
import { IPlayerSearchState, CPresetTypes, CSearchTypes } from './player-search.interfaces';


const initialState: IPlayerSearchState = {
  query:         'jtbc',
  filter:        '',
  searchType:    CSearchTypes.VIDEO,
  queryParams: {
    preset:    '',
    duration:  -1
  },
  presets: [
    { label: 'Any',       value: '' },
    { label: 'Albums',    value: CPresetTypes.FULL_ALBUMS },  
    { label: 'Live',      value: CPresetTypes.LIVE}
  ],
  pageToken: {
    next:    '',
    prev:    ''
  },
  isSearching:   false,
  results:       []
}; //e const


export function search (
  state: IPlayerSearchState = initialState
  , action: Actions
): IPlayerSearchState {
  switch (action.type) {
    case ActionTypes.UPDATE_QUERY: {
      return { ...state, query: action.payload };
    }//e case

    case ActionTypes.SEARCH_NEW_QUERY: {
      return { ...state, query: action.payload, isSearching: true };
    }//e case

    case ActionTypes.UPDATE_QUERY_PARAM: {
      const queryParams = { ...state.queryParams, ...action.payload };
      return { ...state, queryParams };
    }//e case

    case ActionTypes.SEARCH_RESULTS_RETURNED: {
      const { nextPageToken, prevPageToken } = action.payload;
      const statePageToken  = state.pageToken;
      const pageToken = {
        next: nextPageToken || statePageToken.next,
        prev: prevPageToken || statePageToken.prev
      };
      return { ...state, pageToken };
    }//e case

    case ActionTypes.SEARCH_STARTED: {
      return { ...state, isSearching: true };
    }//e case

    case ActionTypes.ADD_RESULTS: {
      return {
        ...state
        , results:     [...state.results, ...action.payload]
        , isSearching: false
      };
    }//e case

    case ActionTypes.RESET_RESULTS: {
      return { ...state, results: [] };
    }//e case

    case ActionTypes.UPDATE_SEARCH_TYPE: {
      return { ...state, searchType: action.payload };
    }//e case

    case ActionTypes.START_PLAYLISTS_SEARCH: {
      return { ...state, isSearching: true };
    }//e case

    case ActionTypes.ERROR_RESULTS: {
      console.log ([`★★-->> [${Date ()}`
                  , `   -->> player-search.reducer.ts # ERROR_RESULTS(ln:80+-)`
                  , `   -->> error: ${JSON.stringify (action.payload)} `]
                  .join('\n') );
      return { ...state };
    }//e case

    default: {
      return { ...initialState, ...state };
    }
  }//e switch
}
//e function
