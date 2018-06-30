import { Routes } from '@angular/router';
import { AppSearchComponent } from './app-search.component';
import { YoutubeVideosComponent } from './youtube-videos/index';
import { YoutubePlaylistsComponent } from './youtube-playlists/index';


export const APPSEARCH_ROUTES: Routes = [
  {
    path:      'search', 
    component: AppSearchComponent,
    children: [
      { path: '', redirectTo: 'videos', pathMatch: 'full' },
      { path: 'videos',    component: YoutubeVideosComponent },
      { path: 'playlists', component: YoutubePlaylistsComponent }
    ]
  }
];
// const
