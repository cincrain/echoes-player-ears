import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserProfileService } from '@core/services/index';

import { Observable } from 'rxjs/Observable';


@Injectable ()
export class PlaylistVideosResolver implements Resolve<any> {
  constructor (private userProfileService: UserProfileService) {
  }//e constructor


  resolve (route: ActivatedRouteSnapshot): Observable<any> {
    const playlistId = route.params['id'];
    return this.userProfileService.fetchAllPlaylistItems (playlistId);
  }//e resolve
}
//e class
