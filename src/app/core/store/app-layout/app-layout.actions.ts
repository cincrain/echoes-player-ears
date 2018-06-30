import { Action } from '@ngrx/store';


export enum ActionTypes {
  EXPAND_SIDEBAR        = '[AppLayout] expand sidebar',
  COLLAPSE_SIDEBAR      = '[AppLayout] collapse sidebar',
  TOGGLE_SIDEBAR        = '[AppLayout] toggle sidebar',

  CHANGE_APP_THEME      = '[AppLayout] change app theme',
  UPDATE_APP_VERSION    = '[AppLayout] update app version',
  CHECK_APP_VERSION     = '[AppLayout] check app version',
  APP_VERSION_RECEIVED  = '[AppLayout] app version received',
}
//e enum


export class ExpandSidebarE0R1 implements Action {
  readonly type = ActionTypes.EXPAND_SIDEBAR;
  constructor (public payload = true) {}
}
export class CollapseSidebarE0R1 implements Action {
  readonly type = ActionTypes.COLLAPSE_SIDEBAR;
  constructor (public payload = false) {}
}
export class ToggleSidebarE0R1 implements Action {
  readonly type = ActionTypes.TOGGLE_SIDEBAR;
  constructor (public payload = '') {}
}
export class ChangeAppThemeE0R1 implements Action {
  readonly type = ActionTypes.CHANGE_APP_THEME;
  constructor (public payload: string) {}
}
export class UpdateAppVersionE1R0 implements Action {
  readonly type = ActionTypes.UPDATE_APP_VERSION;
  constructor (public payload = '') {}
}
export class CheckAppVersionE1R1 implements Action {
  readonly type = ActionTypes.CHECK_APP_VERSION;
  constructor (public payload = '') {}
}
export class AppVersionReceivedE0R1 implements Action {
  readonly type = ActionTypes.APP_VERSION_RECEIVED;
  constructor (public payload = '') {}
}
//e class

export type Actions =
  | ExpandSidebarE0R1
  | CollapseSidebarE0R1
  | ToggleSidebarE0R1
  | ChangeAppThemeE0R1
  | UpdateAppVersionE1R0
  | CheckAppVersionE1R1
  | AppVersionReceivedE0R1;
//e type
