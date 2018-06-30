// import { createSelector } from '@ngrx/store';
// import { getFPlayerSearchState } from '@store/freducers-selectors';
import { IPlayerSearchState, IQueryParam } from './player-search.interfaces';


export const getPlayerSearchResults = (state: IPlayerSearchState) => state.results;

export const getQuery               = (state: IPlayerSearchState) => state.query;

export const getQueryParams         = (state: IPlayerSearchState) => state.queryParams;

export const getSearchType          = (state: IPlayerSearchState) => state.searchType;

export const getIsSearching         = (state: IPlayerSearchState) => state.isSearching;

export const getPresets             = (state: IPlayerSearchState) => state.presets;
//e const


// export const getPlayerSearchResults = createSelector (getFPlayerSearchState
//   , (state: IPlayerSearchState) => state.results
// );

// export const getQuery               = createSelector (getFPlayerSearchState
//   , (state: IPlayerSearchState) => state.query
// );

// export const getQueryParams         = createSelector (getFPlayerSearchState
//   , (state: IPlayerSearchState) => state.queryParams
// );

// export const getQueryParamPreset    = createSelector (getQueryParams
//   , (queryParams: IQueryParam) => queryParams.preset
// );

// export const getSearchType          = createSelector (getFPlayerSearchState
//   , (state: IPlayerSearchState) => state.searchType
// );

// export const getIsSearching         = createSelector (getFPlayerSearchState
//   , (state: IPlayerSearchState) => state.isSearching
// );

// export const getPresets             = createSelector (getFPlayerSearchState
//   , (state: IPlayerSearchState) => state.presets
// );
//e const
