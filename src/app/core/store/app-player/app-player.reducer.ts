import { ActionTypes, Actions } from './app-player.actions';


type GoogleApiYoutubeVideo = 
| GoogleApiYouTubeVideoResource
| GoogleApiYouTubeSearchResource
| any;
//e type


export interface IAppPlayerState {
  mediaId:       { videoId: string };
  index:         number;
  media?:        GoogleApiYoutubeVideo;
  showPlayer:    boolean;
  playerState:   number;
  fullscreen: {
    on:     boolean;
    width:  number;
    height: number;
  };
  isFullscreen:  boolean;
  errMessage:    string;
}
//e interface


const initialState: IAppPlayerState = {
  mediaId:       { videoId: 'NONE'},
  index:         0,
  media: {
    snippet: { title: 'NO MEDIA YET' }
  },
  showPlayer:    true,
  playerState:   0,
  fullscreen: {
    on:     false,
    width:  367,
    height: 270
  },
  isFullscreen:  false,
  errMessage:    ''
}; //e const


export function appPlayer (
  state:     IAppPlayerState = initialState
  , action:  Actions

): IAppPlayerState {
  switch (action.type) {
    case ActionTypes.PLAY: {
      return playVideo (state, action.payload);
    }//e case

    case ActionTypes.QUEUE: {
      return state;
    }//e case

    case ActionTypes.TOGGLE_PLAYER: {
      return toggleVisibility (state);
    }//e case

    case ActionTypes.UPDATE_STATE: {
      return changePlayerState (state, action.payload);
    }//e case

    case ActionTypes.FULLSCREEN : {
      const on = !state.fullscreen.on;
      let { width, height }  = initialState.fullscreen;
      if (on) {
        width  = window.innerWidth;
        height = window.innerHeight;
      }
      const fullscreen = { on, width, height };

      return { ...state, fullscreen };
    }//e case

    case ActionTypes.RESET: {
      return { ...state, isFullscreen: false, playerState: 0 };
    }//e case

    case ActionTypes.RESET_FULLSCREEN: {
      const fullscreen = initialState.fullscreen;
      return { ...initialState, ...state, fullscreen };
    }//e case

    case ActionTypes.APP_PLAYER_ERROR: {
      return { ...state, errMessage: action.payload };
    }//e case

    default: {
      return { ...initialState, ...state };
    }
  }//e switch
}
//e function


function playVideo (state: IAppPlayerState, media: GoogleApiYoutubeVideo ) {
  return { ...state, mediaId: media.id, media };
}//e function


function toggleVisibility (state: IAppPlayerState) {
  return { ...state, showPlayer: !state.showPlayer };
}//e function


function changePlayerState (state: IAppPlayerState, playerState: YT.PlayerState) {
  return { ...state, playerState: playerState };
}//e changePlayerState
