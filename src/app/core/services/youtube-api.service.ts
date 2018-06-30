import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';


interface YoutubeApiServiceOptions {
  http?:         HttpClient;
  url?:          string;
  idKey?:        string;
  authService?:  AuthorizationService;
  config?:       any;
  authorize?:    boolean;
}//e interface


const defaultParams = {
  part:          'snippet,contentDetails',
  key:           environment.youtube.API_KEY,
  maxResults:    '50',
  pageToken:     '',
}; //e const


export class YoutubeApiService {
  http:          HttpClient;
  url:           string;
  idKey:         string;
  authorize      = false;
  isSearching    = false;
  params:        HttpParams;
  nextPageToken: string;

  constructor (
    options:  any
    , private authService?: AuthorizationService
  ) {
    this.resetConfig ();
    if (this.authService) {
      this.authorize = true;
    }
    if (options) {
      this.http  = options.http;
      this.url   = options.url;
      this.idKey = options.idKey || '';
      if (options.config) {
        this.setConfig (options.config);
      }
    }
  }//e constructor


  setConfig (options) {
    this.params = Object.keys (options).reduce ((params, option) => {
      return params.set (option, options[option]);
    }, this.params);
  }//e setConfig


  hasToken (): boolean {
    return this.authService && this.authService.accessToken.length > 0;
  }//e hasToken


  resetConfig () {
    this.params = new HttpParams ({ fromObject: defaultParams });
  }//e resetConfig


  /****
   * list, add, update, remove to Youtube repo
   */
  getList () {
    this.isSearching = true;
    const options = {
      params:     this.params,
      headers:    this.createHeaders ()
    };
    return this.http.get (this.url, options);
  }//e getList


  list (id) {
    if (this.idKey) {
      this.setConfig ({ [this.idKey]: id });
      // this.params[this.idKey] = id;
    }
    this.isSearching = true;
    const options = {
      params:     this.params,
      headers:    this.createHeaders ()
    };
    return this.http.get (this.url, options).pipe (
      map ((res: any) => {
        this.nextPageToken = res.nextPageToken;
        this.isSearching   = false;
        return res;
      })
    );
  }//e list


  fetchNextPage () {
    if (!this.nextPageToken) {
      this.setPageToken (this.nextPageToken);
      // this.params['pageToken'] = this.nextPageToken;
    }
  }//e fetchMextPage


  resetPageToken (){ 
    this.setPageToken ('');
    // this.params['pageToken'] = '';
  }//e resetPageToken


  setPageToken (pageToken) {
    this.setConfig ({ pageToken });
  }//e setPageToken


  deletePageToken () {
    this.params = this.params.delete ('pageToken');
    console.log ([`★★-->> [${Date ()}`
                , `   -->> youtube-api.service.ts # deletePageToken(ln:125+-)`
                , `   -->> VERIFY PARAMS: ${this.params.toString ()} `]
                .join('\n') );
  }//e deletePageToken


  createHeaders () {
    const accessToken = this.authService && this.authService.accessToken;
    const headers     = {};
    if (accessToken && this.authorize) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
  }//e createHeaders
}
//e class
