import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { UserProfileService } from '@core/services/index';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable ()
export class PlaylistResolver implements Resolve<any> {
  constructor (private userProfileService: UserProfileService) {
  }//e constructor


  resolve (
    route: ActivatedRouteSnapshot
  ): Observable<GoogleApiYouTubePlaylistResource> {
    const playlistId = route.params['id'];
    return this.userProfileService.fetchPlaylist (playlistId)
      .pipe (
        map (res => res.items[0])
      );
  }//e resolve
}
//e class
