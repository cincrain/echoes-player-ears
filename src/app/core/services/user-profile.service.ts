import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { YoutubeApiService } from './youtube-api.service';
import { YoutubeVideosInfoService } from './youtube-videos-info.service';
import { AuthorizationService } from './authorization.service';
import { GoogleBasicProfile } from '@store/user-profile/index';

import { Subject, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';


@Injectable ()
export class UserProfileService {
  isSearching: Boolean = false;
  public playlistInfo:   YoutubeApiService;
  public playlists:      YoutubeApiService;
  public playlistApi:    YoutubeApiService;

  constructor (
    private http: HttpClient
    , private youtubeVideosInfoService: YoutubeVideosInfoService
    , private authService: AuthorizationService
  ) {
    this.playlistInfo = new YoutubeApiService ({
      http:   this.http,
      url:    'https://www.googleapis.com/youtube/v3/playlistItems',
      idKey:  'playlistId',
      config: {
        mine: 'true'
      }
    }, this.authService);

    this.playlists = new YoutubeApiService ({
      http:   this.http,
      url:    'https://www.googleapis.com/youtube/v3/playlists',
      config: {
        mine: 'true',
        part: 'snippet,id,contentDetails'
      }
    }, this.authService);

    this.playlistApi = new YoutubeApiService ({
      http:   this.http,
      url:    'https://www.googleapis.com/youtube/v3/playlists',
      idKey:  'id',
      config: {
        part: 'snippet,id,contentDetails'
      }
    }, this.authService);
  }//e constructor


  getPlaylists (isNewPage: boolean) {
    const hasAccessToken = this.playlists.hasToken ();
    if (!hasAccessToken) {
      return;
    }
    if (isNewPage) {
      this.playlists.resetPageToken ();
    }

    this.isSearching = true;
    return this.playlists.getList ();
  }//e getPlaylists


  updatePageToken (pageToken: string) {
    this.playlists.setPageToken (pageToken);
  }//e updatePageToken


  resetPageToken () {
    this.playlists.resetPageToken ();
  }//e resetpageToken


  fetchPlaylist (playlistId: string) {
    return this.playlistApi.list (playlistId);
  }//e fetchPlaylist


  fetchPlaylistItems (playlistId: string, pageToken = '') {
    if ('' === pageToken) {
      this.playlistInfo.deletePageToken ();
    } else {
      this.playlistInfo.setPageToken (pageToken);
    }
    return this.playlistInfo.list (playlistId).pipe (
      switchMap ((res: any) => {
        const videoIds = res.items
          .map (video => video.snippet.resourceId.videoId)
          .join (',');
        return this.youtubeVideosInfoService.api.list (videoIds);
      })
    );
  }//e fetchPlaylistItems


  fetchAllPlaylistItems (playlistId: string) {
    let items            = [];
    const subscriptions: Subscription[] = [];
    const items$         = new Subject ();
    let nextPageToken    = '';

    const fetchMetadata  = res => {
      const videoIds = res.items
        .map (video => video.snippet.resourceId.videoId)
        .join (',');
      nextPageToken  = res.nextPageToken;
      return this.youtubeVideosInfoService.api.list (videoIds);
    };

    const collectItems = videos => {
      items = [...items, ...videos.items];
      if (nextPageToken) {
        fetchItems (playlistId, nextPageToken);
      } else {
        items$.next (items);
        subscriptions.forEach (_s => _s.unsubscribe ());
        items$.complete ();
      }
    };

    const fetchItems = (id, token) => {
      this.playlistInfo.setPageToken (token);
      const sub = this.playlistInfo
        .list (id)
        .pipe (switchMap (res => fetchMetadata (res)))
        .subscribe (res => collectItems (res));
      subscriptions.push (sub);
      return sub;
    };

    fetchItems (playlistId, '');
    return items$.pipe (take (1));
  }//e fetchAllPlaylistItems


  toUserJson (profile): GoogleBasicProfile {
    const _profile: GoogleBasicProfile = {};
    if (profile) {
      _profile.name     = profile.getName ();
      _profile.imageUrl = profile.getImageUrl ();
    }
    return _profile;
  }//e toUserJson


  fetchMetadata (items: GoogleApiYouTubeVideoResource[]) {
    const videoIds = items.map (video => video.id).join (',');
    return this.youtubeVideosInfoService.api.list (videoIds);
  }//e fetchMetadata
}
//e class
