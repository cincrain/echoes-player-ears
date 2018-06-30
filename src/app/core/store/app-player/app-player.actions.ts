import { Action }from '@ngrx/store';


export enum ActionTypes {
  PLAY                  = '[Player] play',
  PAUSE                 = '[Player] pause',
  TOGGLE_PLAYER         = '[Player] toggle player',
  LOAD_NEXT_TRACK       = '[Player] load next track',
  LOAD_AND_PLAY         = '[Player] load and play',
  QUEUE                 = '[Player] queue',
  PLAY_STARTED          = '[Player] play started',
  UPDATE_STATE          = '[Player] update state',
  FULLSCREEN            = '[Player] fullscreen',
  RESET_FULLSCREEN      = '[Player] reset fullscreen',
  RESET                 = '[Player] reset',
  SETUP_PLAYER          = '[Player] setup player',
  CHANGE_PLAYER_STATE   = '[Player] change player state',
  APP_PLAYER_ERROR      = '[Player] app player error'
}
//e enum


export class PlayE1R1 implements Action {
  readonly type = ActionTypes.PLAY;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class PauseE1R0 implements Action {
  readonly type = ActionTypes.PAUSE;
  constructor (public payload = '') {}
}
export class TogglePlayerE0R1 implements Action {
  readonly type = ActionTypes.TOGGLE_PLAYER;
  constructor (public payload: boolean = true) {}
}
export class LoadNextTrackE0R0 implements Action {
  readonly type = ActionTypes.LOAD_NEXT_TRACK;
  constructor (public payload = '') {}
}
export class LoadAndPlayE1R0 implements Action {
  readonly type = ActionTypes.LOAD_AND_PLAY;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueE0R1 implements Action {
  readonly type = ActionTypes.QUEUE;
  constructor (public payload = '') {}
}
export class PlayStartedE0R0 implements Action {
  readonly type = ActionTypes.PLAY_STARTED;
  constructor (public payload: GoogleApiYouTubeVideoResource) {}
}
export class UpdateStateE0R1 implements Action {
  readonly type = ActionTypes.UPDATE_STATE;
  constructor (public payload: number) {}
}
export class FullscreenE1R1 implements Action {
  readonly type = ActionTypes.FULLSCREEN;
  constructor (public payload = '') {}
}
export class ResetFullscreenE0R1 implements Action {
  readonly type = ActionTypes.RESET_FULLSCREEN;
  constructor (public payload = '') {}
}
export class ResetE0R1 implements Action {
  readonly type = ActionTypes.RESET;
  constructor (public payload = '') {}
}
export class SetupPlayerE1R0 implements Action {
  readonly type = ActionTypes.SETUP_PLAYER;
  constructor (public payload: any) {}
}
export class ChangePlayerStateE1R0 implements Action {
  readonly type = ActionTypes.CHANGE_PLAYER_STATE;
  constructor (public payload: YT.PlayerState) {}
}
export class AppPlayerErrorE0R1 implements Action {
  readonly type = ActionTypes.APP_PLAYER_ERROR;
  constructor (public payload = '') {}
}
//e class



export type Actions =
  | PlayE1R1
  | PauseE1R0
  | TogglePlayerE0R1
  | LoadNextTrackE0R0
  | LoadAndPlayE1R0
  | QueueE0R1
  | PlayStartedE0R0
  | UpdateStateE0R1
  | FullscreenE1R1
  | ResetFullscreenE0R1
  | ResetE0R1
  | SetupPlayerE1R0
  | ChangePlayerStateE1R0
  | AppPlayerErrorE0R1;
//e type
