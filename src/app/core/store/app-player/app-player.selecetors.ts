// import { createSelector } from '@ngrx/store';
// import { getFAppPlayerState } from '@store/freducers-selectors';
import { IAppPlayerState } from './app-player.reducer';


export const getCurrentMedia     = (state: IAppPlayerState) => state.media;

export const getIsPlayerPlaying  = (state: IAppPlayerState) => state.playerState === 1;

export const getShowPlayer       = (state: IAppPlayerState) => state.showPlayer;

export const getPlayerFullscreen = (state: IAppPlayerState) => state.fullscreen;
//e const


// export const getCurrentMedia     = createSelector (getFAppPlayerState
//   , (state: IAppPlayerState) => state.media
// );

// export const getIsPlayerPlaying  = createSelector (getFAppPlayerState
//   , (state: IAppPlayerState) => state.playerState === 1
// );

// export const getShowPlayer       = createSelector (getFAppPlayerState
//   , (state: IAppPlayerState) => state.showPlayer
// );

// export const getPlayerFullscreen = createSelector (getFAppPlayerState
//   , (state: IAppPlayerState) => state.fullscreen
// );
// //e const
