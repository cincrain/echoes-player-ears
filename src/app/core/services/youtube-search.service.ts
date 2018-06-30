import { Injectable } from '@angular/core';
import { YoutubeDataApi, DataApiProviders } from './youtube-data-api/index';
import { switchMap } from 'rxjs/operators';


const SearchTypes = {
  VIDEO:    'video',
  PLAYLIST: 'playlist',
  CHANNEL:  'channel'
}; //e const


export const SearchParams = {
  Types: {
    [SearchTypes.VIDEO]:    'video',
    [SearchTypes.PLAYLIST]: 'playlist',
    [SearchTypes.CHANNEL]:  'channel'
  }
};
//e const


@Injectable ()
export class YoutubeSearchService {
  private _api            = DataApiProviders.SEARCH;
  private _apiOptions     = {
    part:      'snippet,id',
    q:         '',
    type:      'video',
    pageToken: ''
  };

  constructor (private youtubeDataApi: YoutubeDataApi) {
  }//e constructor


  search (query: string, params?: any) {
    if (query || '' === query) {
      const preset = params ? ` ${params.preset}` : '';
      this._apiOptions.q = `${query}${preset}`;
    }
    return this.youtubeDataApi.list (this._api, this._apiOptions);
  }//e search


  searchFor (type: string, query: string, params?: any) {
    switch (type) {
      case SearchTypes.VIDEO: {
        return this.searchVideo (query, params);
      }//e case

      case SearchTypes.PLAYLIST: {
        return this.searchForPlaylist (query, params);
      }//e case
    }//e switch
  }//e searchFor


  searchVideo (query: string, params?: any) {
    this._apiOptions.type = SearchParams.Types[SearchTypes.VIDEO];
    return this.search (query, params);
  }//e searchVideo


  searchForPlaylist (query: string, params?: any) {
    this._apiOptions.type = SearchParams.Types[SearchTypes.PLAYLIST];
    return this.search (query, params).pipe (
      switchMap ((res: any) => {
        const options = {
          part: 'snippet,id,contentDetails',
          id:   res.items.map (pl => pl.id.playlistId).join (',')
        };
        return this.youtubeDataApi.list (DataApiProviders.PLAYLISTS, options);
      })
    );
  }//e searchForPlaylist


  searchMore (nextPageToken: string) {
    this._apiOptions.pageToken = nextPageToken;
    return this;
  }//e searchMore


  resetPageToken () {
    this._apiOptions.pageToken = '';
    return this;
  }//e resetPageToken
}
//e class
