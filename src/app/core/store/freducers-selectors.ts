import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router-store/index';
import * as AppLayoutARS from './app-layout/index';
import * as UserProfileARS from './user-profile/index';
import * as PlayerSearchARS from './player-search/index';
import * as AppPlayerARS from './app-player/index';
import * as NowPlaylistARS from './now-playlist/index';
//import { IAppLayoutState, appLayout } from './app-layout/index';
// import { IUserProfileState, userProfile } from './user-profile/index';
// import { IPlayerSearchState, search } from './player-search/index';
// import { IAppPlayerState, appPlayer } from './app-player/index';
// import { INowPlaylistState, nowPlaylist } from './now-playlist/index';
// import { getPlayerSearchResults } from './player-search/index';


/****
 * top level state interface
 */
export interface IEchoesState {
  appLayout:     AppLayoutARS.IAppLayoutState,
  userProfile:   UserProfileARS.IUserProfileState,
  search:        PlayerSearchARS.IPlayerSearchState,
  appPlayer:     AppPlayerARS.IAppPlayerState,
  nowPlaylist:   NowPlaylistARS.INowPlaylistState,

  router:        RouterReducerState<RouterStateUrl>
}
//e interface


/****
 * top level action reducer map
 */
export const echoesReducers: ActionReducerMap<IEchoesState> = {
  appLayout:     AppLayoutARS.appLayout,
  userProfile:   UserProfileARS.userProfile,
  search:        PlayerSearchARS.search,
  appPlayer:     AppPlayerARS.appPlayer,
  nowPlaylist:   NowPlaylistARS.nowPlaylist,

  router:        routerReducer
}
//e const


/****
 * injectable actions if any
 */
export const echoesActionTypes = [
];
//e const


/****
 * top level: feature state selectors
 * AppLayout
 */
export const getFAppLayoutState    
= createFeatureSelector<AppLayoutARS.IAppLayoutState> ('appLayout');

export namespace AppLayoutState {
  export const getSidebarCollapsed   = createSelector (getFAppLayoutState
    , AppLayoutARS.getSidebarCollapsed
  );
  
  export const getAppTheme          = createSelector (getFAppLayoutState
    , AppLayoutARS.getAppTheme
  );
  
  export const getAllAppThemes      = createSelector (getFAppLayoutState
    , AppLayoutARS.getAllAppThemes
  );
  
  export const getAppThemes         = createSelector (getAppTheme, getAllAppThemes
    , (theme: string, themes: string[]) => ({
        selected:   theme
        , themes:   themes.map (_theme => ({ label: _theme, value: _theme }))
    })
  );
  
  export const getAppVersion        = createSelector (getFAppLayoutState
    , AppLayoutARS.getAppVersion
  );
  //e const
}
//e namespace App:ayout


// UserProfile
export const getFUserProfileState  
= createFeatureSelector<UserProfileARS.IUserProfileState> ('userProfile');

export namespace UserProfileState {
  export const getPlaylists       = createSelector (getFUserProfileState
    , UserProfileARS.getPlaylists  
  );

  export const getViewedPlaylist   = createSelector (getFUserProfileState
    , UserProfileARS.getViewedPlaylist
  );
  
  export const getIsSignedIn       = createSelector (getFUserProfileState
    , UserProfileARS.getIsSignedIn
  );
  //e const
}
//e namespave UserProfileState


// PlayerSearch
export const getFPlayerSearchState
= createFeatureSelector<PlayerSearchARS.IPlayerSearchState> ('search');

export namespace PlayerSearchState {
  export const getResults            = createSelector (getFPlayerSearchState
    , PlayerSearchARS.getPlayerSearchResults
  );
  
  export const getQuery              = createSelector (getFPlayerSearchState
    , PlayerSearchARS.getQuery
  );
  
  export const getQueryParams        = createSelector (getFPlayerSearchState
    , PlayerSearchARS.getQueryParams
  );
  
  export const getQueryParamPreset   = createSelector (getQueryParams
    , (queryParams: PlayerSearchARS.IQueryParam) => queryParams.preset
  );
  
  export const getSearchType         = createSelector (getFPlayerSearchState
    , PlayerSearchARS.getSearchType
  );
  
  export const getIsSearching        = createSelector (getFPlayerSearchState
    , PlayerSearchARS.getIsSearching
  );
  
  export const getPresets            = createSelector (getFPlayerSearchState
    , PlayerSearchARS.getPresets
  );
  //e const
}
//e namespace PlayerSearchState


// AppPlayer
export const getFAppPlayerState
= createFeatureSelector<AppPlayerARS.IAppPlayerState> ('appPlayer');

export namespace AppPlayerState {
  export const getCurrentMedia       = createSelector (getFAppPlayerState
    , AppPlayerARS.getCurrentMedia
  );
  
  export const getIsPlayerPlaying    = createSelector (getFAppPlayerState
    , AppPlayerARS.getIsPlayerPlaying
  );
  
  export const getShowPlayer         = createSelector (getFAppPlayerState
    , AppPlayerARS.getShowPlayer
  );
  
  export const getPlayerFullscreen   = createSelector (getFAppPlayerState
    , AppPlayerARS.getPlayerFullscreen
  );
  //e const
}
// namespace AppPlayerState


// NowPlaylist
export const getFNowPlaylistState
= createFeatureSelector<NowPlaylistARS.INowPlaylistState> ('nowPlaylist');

export namespace NowPlaylistState {
  export const isPlayerInRepeat      = createSelector (getFNowPlaylistState
    , NowPlaylistARS.isPlayerInRepeat
  );
  
  export const getPlaylistVideos     = createSelector (getFNowPlaylistState
    , NowPlaylistARS.getPlaylistVideos
  );
  
  export const getPlaylistMediaIds   = createSelector (getPlaylistVideos
    , (playlist: GoogleApiYouTubeVideoResource[]) => playlist.map (media => media.id)
  );
  
  export const getSelectedMediaId    = createSelector (getFNowPlaylistState
    , NowPlaylistARS.getSelectedMediaId
  );
  
  export const getSelectedMedia_NowPlaylist
  = createSelector (getFNowPlaylistState, getSelectedMediaId
    , (state: NowPlaylistARS.INowPlaylistState, selectedId) => {
        const mediaIds = state.videos.map (video => video.id);
        const selectedMediaIndex = mediaIds.indexOf (selectedId);
        return state.videos[selectedMediaIndex];
    }
  );
  //e const
}
//e namespace NowPlaylistState
