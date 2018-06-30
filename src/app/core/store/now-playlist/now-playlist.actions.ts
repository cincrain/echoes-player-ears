import { Action } from '@ngrx/store';


export enum ActionTypes {
  QUEUE_LOAD_VIDEO            = '[NowPlaylist] queue load video',
  QUEUE_LOAD_VIDEO_SUCCESS    = '[NowPlaylist] queue load video success',
  QUEUE                       = '[NowPlaylist] queue',
  QUEUE_FAILED                = '[NowPlaylist] queue failed',
  QUEUE_VIDEOS                = '[NowPlaylist] queue videos',
  SELECT                      = '[NowPlaylist] select',
  REMOVE                      = '[NowPlaylist] remove',
  REMOVE_ALL                  = '[NowPlaylist] remove all',
  UPDATE_INDEX                = '[NowPlaylist] update index',
  CHANGE_FILTER               = '[NowPlaylist] change filter',
  SELECT_NEXT                 = '[NowPlaylist] select next',
  SELECT_PREVIOUS             = '[NowPlaylist] select previous',
  MEDIA_ENDED                 = '[NowPlaylist] media ended',
  TOGGLE_REPEAT               = '[NowPlaylist] toggle repeat',
  SELECT_AND_SEEK_TO_TIME     = '[NowPlaylist] select and seek to time',
  LOAD_PLAYLIST_START         = '[NowPlaylist] load playlist start',
  LOAD_PLAYLIST_END           = '[NowPlaylist] load playlist end',
  PLAY_PLAYLIST               = '[NowPlaylist] play playlist',
  PLAY_PLAYLIST_START         = '[NowPlaylist] play playlist start',
  CHANGE_PLAYER_STATE         = '[NowPlaylist] change player state'
}
//e enum


export class QueueLoadVideoE0R0 implements Action {
  readonly type = ActionTypes.QUEUE_LOAD_VIDEO;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueLoadVideoSuccessE0R0 implements Action {
  readonly type = ActionTypes.QUEUE_LOAD_VIDEO_SUCCESS;
  constructor (public payload = '') {}
}
export class QueueE0R1 implements Action {
  readonly type = ActionTypes.QUEUE;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueFailedE0R0 implements Action {
  readonly type = ActionTypes.QUEUE_FAILED;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueVideosE0R1 implements Action {
  readonly type = ActionTypes.QUEUE_VIDEOS;
  constructor (public payload: GoogleApiYouTubeVideoResource[]) {}
}
export class SelectE1R1 implements Action {
  readonly type = ActionTypes.SELECT;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class RemoveE0R1 implements Action {
  readonly type = ActionTypes.REMOVE;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class RemoveAllE0R1 implements Action {
  readonly type = ActionTypes.REMOVE_ALL;
  constructor (public payload = '') {}
}
export class UpdateIndexE0R1 implements Action {
  readonly type = ActionTypes.UPDATE_INDEX;
  constructor (public payload: string) {}
}
export class ChangeFilterE0R1 implements Action {
  readonly type = ActionTypes.CHANGE_FILTER;
  constructor (public payload: string) {}
}
export class SelectNextE0R1 implements Action {
  readonly type = ActionTypes.SELECT_NEXT;
  constructor (public payload = '') {}
}
export class SelectPreviousE0R1 implements Action {
  readonly type = ActionTypes.SELECT_PREVIOUS;
  constructor (public payload = '') {}
}
export class MediaEndedE1R1 implements Action {
  readonly type = ActionTypes.MEDIA_ENDED;
  constructor (public payload = '') {}
}
export class ToggleRepeatE0R1 implements Action {
  readonly type = ActionTypes.TOGGLE_REPEAT;
  constructor (public payload = '') {}
}
export class SelectAndSeekToTimeE2R0 implements Action {
  readonly type = ActionTypes.SELECT_AND_SEEK_TO_TIME;
  constructor (public payload: { time: string, media: GoogleApiYouTubeVideoResource }) {}
}
export class LoadPlaylistStartE1R0 implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_START;
  constructor (public payload: string) {}
}
export class LoadPlaylistEndE2R1 implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_END;
  constructor (public payload: GoogleApiYouTubeVideoResource[]) {}
}
export class PlayPlaylistE0R0 implements Action {
  readonly type = ActionTypes.PLAY_PLAYLIST;
  constructor (public payload: string) {}
}
export class PlayPlaylistStartE0R0 implements Action {
  readonly type = ActionTypes.PLAY_PLAYLIST_START;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class ChangePlayerStateE1R0 implements Action {
  readonly type = ActionTypes.CHANGE_PLAYER_STATE;
  constructor (public payload: YT.PlayerState) {}
}
//e class


export type Actions =
  | QueueLoadVideoE0R0
  | QueueLoadVideoSuccessE0R0
  | QueueE0R1
  | QueueFailedE0R0
  | QueueVideosE0R1
  | SelectE1R1
  | RemoveE0R1
  | RemoveAllE0R1
  | UpdateIndexE0R1
  | ChangeFilterE0R1
  | SelectNextE0R1
  | SelectPreviousE0R1
  | MediaEndedE1R1
  | ToggleRepeatE0R1
  | SelectAndSeekToTimeE2R0
  | LoadPlaylistStartE1R0
  | LoadPlaylistEndE2R1
  | PlayPlaylistE0R0
  | PlayPlaylistStartE0R0
  | ChangePlayerStateE1R0;
//e type
