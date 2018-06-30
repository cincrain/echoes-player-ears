export interface IQueryParam {
  preset:        string;
  duration:      number;
}
//e interface


export interface IPlayerSearchState {
  query:         string;
  filter:        string;
  searchType:    string;
  queryParams:   IQueryParam;
  presets:       IPresetParam[];
  pageToken: {
    next:  string;
    prev:  string;
  };
  isSearching:   boolean;
  results:       any[];
}
//e interface


export interface ISearchQueryParam {
  [property: string]: any;
}
//e interface


export interface IPresetParam {
  label:         string;
  value:         CPresetTypes | string;

}
//e interface


export class CSearchTypes {
  static VIDEO    = 'video';
  static PLAYLIST = 'playlist';
}
//e class


export class CPresetTypes {
  static FULL_ALBUMS = 'full albums';
  static LIVE        = 'live';
}
//e class
