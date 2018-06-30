import { Routes } from '@angular/router';
import { PlaylistViewComponent } from './playlist-view.component';
import { PlaylistVideosResolver, PlaylistResolver } from '@core/resolvers/index';


export const PLAYLIST_ROUTES: Routes = [
  {
    path:      'playlist/:id',
    component: PlaylistViewComponent,
    resolve: {
      videos:   PlaylistVideosResolver,
      playlist: PlaylistResolver
    }
  }
];
//e const
