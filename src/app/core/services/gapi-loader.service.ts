import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable ()
export class GapiLoaderService {
  private _api: Observable<any>;
  private api:  Subject<any>;

  constructor () {
  }//e constructor


  load (api: string) {
    const api$ = this.createApi (api);
    this.loadGoogleApi (api, api$);
    return api$;
  }//e load


  loadGoogleApi (api, api$) {
    const script = document.createElement ('script');
    const gapi   = 'https://apis.google.com/js/api.js';
    script.addEventListener ('load', () => this._loadApi (api, api$));
    script.setAttribute ('src', gapi);
    document.body.appendChild (script);
  }//e loadGoogleApi


  _loadApi (api: string, api$) {
    const gapi           = window['gapi'];
    const gapiAuthLoaded = gapi && gapi.auth2 && gapi.auth2.getAuthInstance ();
    
    if (gapiAuthLoaded && gapiAuthLoaded.currentUser) {
      api$.complete (gapiAuthLoaded);
    } else {
      gapi.load (api, res => api$.next (res));
    }
  }//e _loadApi
  

  createApi (api: string) {
    const api$ = new Subject ();
    return api$;
  }//e createapi
}
//e class
