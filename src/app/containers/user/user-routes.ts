import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { PlaylistsComponent } from './playlists/index';
import { PlaylistViewComponent } from '@containers/playlist-view/playlist-view.component';
import { AuthGuard } from './user.guard';
import { PlaylistVideosResolver, PlaylistResolver } from '@core/resolvers/index';


export const USER_ROUTES: Routes = [
  {
    path:      '',         component: UserComponent,
    children: [
      { path: '',          redirectTo: 'playlists', pathMatch: 'full' },
      { path: 'playlists', component:  PlaylistsComponent },
      {
        path: 'playlist/:id', component: PlaylistViewComponent,
        canActivate:      [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {
          videos:    PlaylistVideosResolver,
          playlist:  PlaylistResolver
        }
      }
    ]
  }
];
//e const
