import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { AuthorizationService } from '../authorization.service';
import { environment } from '@env/environment';


export const DataApiProviders = {
  SEARCH:    'search',
  PLAYLISTS: 'playlists'
};
//e const


export const _defaultUrlParams = {
  part:       'snippet,id',
  maxResults: '50',
  key:        environment.youtube.API_KEY
};
//e const


@Injectable ()
export class YoutubeDataApi {
  private _apiPrefixUrl = 'https://www.googleapis.com/youtube';
  private _apiVersion   = 'v3';
  private get _apiUrl () {
    return `${this._apiPrefixUrl}/${this._apiVersion}`;
  }

  constructor (
    private http: HttpClient
    , private authService: AuthorizationService
  ) {
  }//e constructor


  list (api: string, options) {
    const params   = { ..._defaultUrlParams, ...options };
    const _options = {
      params,
      headers: this.createHeaders (false)
    };
    return this.http.get (this.getApi (api), _options);
  }//e list


  insert (api: string, options) {
    return this.http.post (this.getApi (api), {});
  }//e insert


  update (api) {
    return this._request (api);
  }//e update


  delete (api: string, options) {
    return this._request (api);
  }//e delete


  private _request (api: string)  {
    // const options: RequestOptionsArgs = {
    //   search:   this.config,
    //   headers:  this.createHeaders ()
    // };
    // this.http.
  }//e _request


  private createHeaders (addAuth: boolean) {
    const accessToken    = this.authService.accessToken;
    const headersOptions = {};
    if (accessToken && addAuth) {
      headersOptions['Authorization'] = `Bearer ${accessToken}`;
    }
    return new HttpHeaders (headersOptions);
  }//e createHeaders


  private getApi (api: string): string {
    return `${this._apiUrl}/${api}`;
  }//e getApi
}
//e class
