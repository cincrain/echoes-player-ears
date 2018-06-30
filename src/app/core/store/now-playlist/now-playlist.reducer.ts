import { ActionTypes, Actions } from './now-playlist.actions';


export interface INowPlaylistState {
  videos:        GoogleApiYouTubeVideoResource[];
  selectedId:    string;
  filter:        string;
  repeat:        boolean;
}
//e interface


const initialState: INowPlaylistState = {
  videos:        [],
  selectedId:    '',
  filter:        '',
  repeat:        false
}; //e const


export function nowPlaylist (
  state: INowPlaylistState = initialState
  , action: Actions
): INowPlaylistState {
  switch (action.type) {
    case ActionTypes.SELECT: {
      return { ...state, selectedId: action.payload.id };
    }//e case

    case ActionTypes.QUEUE: {
      return { ...state, videos: addMedia (state.videos, action.payload) };
    }//e case

    case ActionTypes.QUEUE_VIDEOS: {
      return { ...state, videos: addMedias (state.videos, action.payload) };
    }//e case

    case ActionTypes.REMOVE: {
      return { ...state, videos: removeMedia (state.videos, action.payload) };
    }//e case

    case ActionTypes.UPDATE_INDEX: {
      return { ...state, selectedId: action.payload };
    }//e case

    case ActionTypes.CHANGE_FILTER: {
      return { ...state, filter: action.payload };
    }//e case

    case ActionTypes.REMOVE_ALL: {
      return { ...state, videos: [], filter: '', selectedId: '' };
    }//e case

    case ActionTypes.SELECT_NEXT: {
      return { ...state
        , selectedId: selectNextIndex (state.videos, state.selectedId, state.filter, state.repeat)
      };
    }//e case

    case ActionTypes.SELECT_PREVIOUS: {
      return { ...state
        , selectedId: selectPreviousIndex (state.videos, state.selectedId, state.filter)
      };
    }//e case

    case ActionTypes.MEDIA_ENDED: {
      return selectNextOrPreviousTrack (state, state.filter);
    }//e case

    case ActionTypes.TOGGLE_REPEAT: {
      return { ...state, repeat: !state.repeat };
    }//e case

    case ActionTypes.LOAD_PLAYLIST_END: {
        return { ...state };
    }//e case

    default: {
      return state;
    }
  }//e switch
}
//e function


function selectNextOrPreviousTrack (state: INowPlaylistState, filter: string): INowPlaylistState {
  const { videos, selectedId, repeat } = state;
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(videos, filter, selectedId);
  const isCurrentLast = currentIndex + 1 === filteredVideos.length;
  const nextId        = isCurrentLast
    ? getNextIdForPlaylist (filteredVideos, repeat, selectedId)
    : selectNextIndex (filteredVideos, selectedId, filter, repeat);
  return { ...state, selectedId: nextId };
}//e function


function getNextIdForPlaylist (
  videos:      GoogleApiYouTubeVideoResource[]
  , repeat:    boolean
  , currentId: string = ''
) {
  let id = '';
  if (videos.length && repeat) {
    id = videos[0].id;
  }
  return id;
}//e function


function addMedia (videos: GoogleApiYouTubeVideoResource[], media: any) {
  const newMedia  = videos.findIndex (video => video.id === media.id);
  const newMedias = [];
  if (newMedia === -1) {
    newMedias.push (media);
  }
  return [...videos, ...newMedias];
}//e function


function addMedias (videos: GoogleApiYouTubeVideoResource[], medias) {
  const allVideoIds = videos.map (video => video.id);
  const newVideos   = medias.filter (media => !allVideoIds.includes (media.id));
  return [...videos, ...newVideos];
}//e function


function removeMedia (videos: GoogleApiYouTubeVideoResource[], media: any) {
  return videos.filter ((_media: GoogleApiYouTubeVideoResource) => _media.id !== media.id);
}//e function


function selectNextIndex (
  videos:       GoogleApiYouTubeVideoResource[]
  , selectedId: string
  , filter:     string
  , isRepeat:   boolean
): string {
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos (videos, filter, selectedId);
  let nextIndex = currentIndex + 1;
  if (filteredVideos.length === nextIndex) {
    nextIndex = isRepeat ? 0 : currentIndex;
  }
  return filteredVideos[nextIndex].id || '';
}//e function


function getSelectedInFilteredVideos (
  videos:       GoogleApiYouTubeVideoResource[]
  , filter:     string
  , selectedId: string
) {
  const filteredVideos       = filterVideos (videos, filter);
  const currentIndex: number = filteredVideos.findIndex (video => video.id === selectedId);
  return { filteredVideos, currentIndex };
}//e function


function filterVideos (videos: GoogleApiYouTubeVideoResource[], filter: string) {
  const sanitizedFilter = filter.toLowerCase ();
  return videos.filter (video => JSON.stringify (video).toLowerCase ().includes (sanitizedFilter));
}//e function


function selectPreviousIndex (
  videos:       GoogleApiYouTubeVideoResource[]
  , selectedId: string
  , filter:     string
): string {
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos (videos, filter, selectedId);
  let previousIndex = currentIndex - 1;
  if (!filteredVideos.length || previousIndex < 0) {
    previousIndex = 0;
  }
  return filteredVideos[previousIndex].id || '';
}//e function
