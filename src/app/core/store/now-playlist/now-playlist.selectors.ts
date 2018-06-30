// import { createSelector } from '@ngrx/store';
// import { getFNowPlaylistState } from '@store/freducers-selectors';
import { INowPlaylistState } from './now-playlist.reducer';


export const isPlayerInRepeat    = (state: INowPlaylistState) => state.repeat;

export const getPlaylistVideos   = (state: INowPlaylistState) => state.videos;

export const getSelectedMediaId  = (state: INowPlaylistState) => state.selectedId;
//e const



// export const isPlayerInRepeat    = createSelector (getFNowPlaylistState
//   , (state: INowPlaylistState) => state.repeat
// );

// export const getPlaylistVideos   = createSelector (getFNowPlaylistState
//   , (state: INowPlaylistState) => state.videos
// );

// export const getPlaylistMediaIds = createSelector (getPlaylistVideos
//   , (playlist: GoogleApiYouTubeVideoResource[]) => playlist.map (media => media.id)
// );

// export const getSelectedMediaId  = createSelector (getFNowPlaylistState
//   , (state: INowPlaylistState) => state.selectedId
// );

// export const getSelectedMedia    = createSelector (getFNowPlaylistState, getSelectedMediaId
//   , (state: INowPlaylistState, selectedId: string) => {
//       const mediaIds = state.videos.map (video => video.id);
//       const selectedMediaIndex = mediaIds.indexOf (selectedId);
//       return state.videos[selectedMediaIndex];
//   }
// );
//e const
