import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { YoutubeApiService } from './youtube-api.service';
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';


@Injectable ()
export class YoutubeVideosInfoService {
  public api: YoutubeApiService;

  constructor (
    private http: HttpClient
    , private authService: AuthorizationService
  ) {
    this.api = new YoutubeApiService ({
      http:    this.http,
      url:     'https://www.googleapis.com/youtube/v3/videos',
      idKey:   'id',
      config: {
        part: 'snippet,contentDetails,statistics'
      }
    }, this.authService);
  }//e constructor


  fetchVideoData (mediaId: string) {
    return this.api.list (mediaId).pipe (
      map (res => res.items[0])
    );
  }//e fetchVideoData


  fetchVideosData (mediaIds: string) {
    return this.api.list (mediaIds).pipe (
      map (res => res.items)
    );
  }//e fetchVideosData
}
//e class
