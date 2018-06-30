import { ActionTypes, Actions } from './app-layout.actions';
import { THEMES, DEFAULT_THEME } from '@app/app.themes';


export interface IAppVersion {
  semver:             string;
  isNewAvailable:     boolean;
  checkingForVersion: boolean;
}
//e interface


export interface IAppLayoutState {
  sidebarExpanded:   boolean;
  theme:             string;
  themes:            string[];
  version:           IAppVersion;
  requestInProgress: boolean;
}
//e interface

const initialState: IAppLayoutState = {
  sidebarExpanded:   true,
  theme:             DEFAULT_THEME,
  themes:            THEMES.sort (),
  version: {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  },
  requestInProgress: false
}; //e const


export function appLayout (
  state: IAppLayoutState = initialState
  , action: Actions
): IAppLayoutState {
  switch (action.type) {
    case ActionTypes.EXPAND_SIDEBAR: {
      return { ...state, sidebarExpanded: true };
    }//e case

    case ActionTypes.COLLAPSE_SIDEBAR: {
      return { ...state, sidebarExpanded: false };
    }//e case

    case ActionTypes.TOGGLE_SIDEBAR: {
      return { ...state, sidebarExpanded: !state.sidebarExpanded };
    }//e case

    case ActionTypes.CHANGE_APP_THEME: {
      return { ...state, theme: action.payload };
    }//e case

    case ActionTypes.CHECK_APP_VERSION: {
      const version = {
        ...state.version, checkingForVersion: true
      };
      return { ...state, version };
    }//e case

    case ActionTypes.APP_VERSION_RECEIVED: {
      const version = getVersion (state, action.payload);
      return { ...state, version };
    }//e case

    default: {
      return { ...initialState, ...state, themes: THEMES.sort () };
    }
  }//e switch
}
//e function


function getVersion (state: IAppLayoutState, packageJson: any): IAppVersion {
  const currentVersion = state.version.semver;
  const remoteVersion  = packageJson.version;
  const version: IAppVersion = {
    semver:             '',
    isNewAvailable:     state.version.isNewAvailable,
    checkingForVersion: false
  };
  const isCurrentVersionEmpty = '' === currentVersion;
  const isCurrentDiffFromRemote = !isCurrentVersionEmpty && currentVersion !== remoteVersion;

  if (isCurrentVersionEmpty) {
    version.semver = remoteVersion;
  }
  if (isCurrentDiffFromRemote && !version.isNewAvailable) {
    version.semver = currentVersion;
    version.isNewAvailable = true;
  } else {
    // upgrade is completed
    version.semver = remoteVersion;
    version.isNewAvailable = false;
  }

  return version;
}//e function
