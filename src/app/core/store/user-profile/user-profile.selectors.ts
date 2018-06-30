import { IUserProfileState } from './user-profile.reducer';


export const getPlaylists      = (state: IUserProfileState) => state.playlists;

export const getViewedPlaylist = (state: IUserProfileState) => state.playlists;

export const getIsSignedIn     = (state: IUserProfileState) => state.access_token !== '';
//e const
