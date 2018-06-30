import { Action } from '@ngrx/store';


export enum ActionTypes {
  UPDATE_DATA            = '[User Profile] update data',
  ADD_PLAYLISTS          = '[User Profile] add playlists',
  UPDATE_TOKEN           = '[User Profile] update token',
  UPDATE_NEXT_PAGE_TOKEN = '[User Profile] update next page token',
  UPDATE_USER_PROFILE    = '[User Profile] update user profile',
  USER_PROFILE_RECEIVED  = '[User Profile] user profile received',
  USER_PROFILE_COMPLETED = '[User Profile] user profile completed',
  VIEWED_PLAYLIST        = '[User Profile] viewed playlist',
  CHECK_USER_AUTH        = '[User Profile] check user auth',
  SIGNIN_USER            = '[User Profile] signin user',
  SIGNIN_USER_START      = '[User Profile] signin user start',
  SIGNIN_USER_SUCCESS    = '[User Profile] signin user success',
  SIGNOUT_USER           = '[User Profile] signout user',
  SIGNOUT_USER_SUCCESS   = '[User Profile] signout user success',
}
//e enum


export class UpdateDataE2R1 implements Action {
  readonly type = ActionTypes.UPDATE_DATA;
  constructor (public payload: any) {}
}
export class AddPlaylistsE0R1 implements Action {
  readonly type = ActionTypes.ADD_PLAYLISTS;
  constructor (public payload: Array<any>) {}
}
export class UpdateTokenE1R1 implements Action {
  readonly type = ActionTypes.UPDATE_TOKEN;
  constructor (public payload: string) {}
}
export class UpdateNextPageTokenE0R1 implements Action {
  readonly type = ActionTypes.UPDATE_NEXT_PAGE_TOKEN;
  constructor (public payload: string) {}
}
export class UpdateUserProfileE0R1 implements Action {
  readonly type = ActionTypes.UPDATE_USER_PROFILE;
  constructor (public payload: any) {}
}
export class UserProfileReceivedE1R0 implements Action {
  readonly type = ActionTypes.USER_PROFILE_RECEIVED;
  constructor (public payload: any) {}
}
export class UserProfileCompletedE0R0 implements Action {
  readonly type = ActionTypes.USER_PROFILE_COMPLETED;
  constructor (public payload = '') {}
}
export class ViewedPlaylistE0R1 implements Action {
  readonly type = ActionTypes.VIEWED_PLAYLIST;
  constructor (public payload: string) {}
}
export class CheckUserAuthE1R0 implements Action {
  readonly type = ActionTypes.CHECK_USER_AUTH;
  constructor (public payload = '') {}
}
export class SigninUserE1R0 implements Action {
  readonly type = ActionTypes.SIGNIN_USER;
  constructor (public payload = '') {}
}
export class SigninUserStartE1R0 implements Action {
  readonly type = ActionTypes.SIGNIN_USER_START;
  constructor (public payload = '') {}
}
export class SigninUserSuccessE3R0 implements Action {
  readonly type = ActionTypes.SIGNIN_USER_SUCCESS;
  constructor (public payload: gapi.auth2.GoogleUser) {}
}
export class SignoutUserE1R0 implements Action {
  readonly type = ActionTypes.SIGNOUT_USER;
  constructor (public payload = '') {}
}
export class SignoutUserSuccessE1R1 implements Action {
  readonly type = ActionTypes.SIGNOUT_USER_SUCCESS;
  constructor (public payload = '') {}
}
//e class


export type Actions =
  | UpdateDataE2R1
  | AddPlaylistsE0R1
  | UpdateTokenE1R1
  | UpdateNextPageTokenE0R1
  | UpdateUserProfileE0R1
  | UserProfileReceivedE1R0
  | UserProfileCompletedE0R0
  | ViewedPlaylistE0R1
  | CheckUserAuthE1R0
  | SigninUserE1R0
  | SigninUserStartE1R0
  | SigninUserSuccessE3R0
  | SignoutUserE1R0
  | SignoutUserSuccessE1R1;
//e type
