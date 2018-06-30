import { ActionTypes, Actions } from './user-profile.actions';


export interface IUserProfileState {
  access_token:       string;
  playlists:          GoogleApiYouTubePlaylistResource[];
  data?:              {};
  nextPageToken?:     string;
  profile:            GoogleBasicProfile;
  viewedPlaylist?:    string;
}
//e interface


export interface GoogleBasicProfile {
  name?:              string;
  imageUrl?:          string;
}
//e interface


const initialState: IUserProfileState = {
  access_token:       '',
  playlists:          [],
  data:               {},
  nextPageToken:      '',
  profile:            {},
  viewedPlaylist:     ''
}; //e const


export function userProfile (
  state: IUserProfileState = initialState
  , action: Actions
): IUserProfileState {
  switch (action.type) {
    case ActionTypes.ADD_PLAYLISTS: {
      return { ...state, playlists: [...state.playlists, ...action.payload] };
    }//e case

    case ActionTypes.UPDATE_TOKEN: {
      return { ...state, access_token: action.payload, playlists: [] };
    }//e case

    case ActionTypes.UPDATE_NEXT_PAGE_TOKEN: {
      return { ...state, nextPageToken: action.payload };
    }//e case

    case ActionTypes.UPDATE_DATA: {
      return { ...state, data: action.payload };
    }//e case

    case ActionTypes.UPDATE_USER_PROFILE: {
      return { ...state, profile: action.payload };
    }//e case

    case ActionTypes.SIGNOUT_USER_SUCCESS: {
      return { ...initialState };
    }//e case

    case ActionTypes.VIEWED_PLAYLIST: {
      return { ...state, viewedPlaylist: action.payload };
    }//e case

    default: {
      return state;
    }
  }//e switch
}
//e function
