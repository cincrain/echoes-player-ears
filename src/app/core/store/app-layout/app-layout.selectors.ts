// import { createSelector } from '@ngrx/store'
// import { getFAppLayoutState } from '@store/freducers-selectors';
import { IAppLayoutState } from './app-layout.reducer';


export const getSidebarCollapsed = (state: IAppLayoutState) => !state.sidebarExpanded

export const getAppTheme         = (state: IAppLayoutState) => state.theme;

export const getAllAppThemes     = (state: IAppLayoutState) => state.themes;

export const getAppVersion       = (state: IAppLayoutState) => state.version;
//e const


// export const getSidebarCollapsed = createSelector (getFAppLayoutState
//   , (state: IAppLayoutState) => !state.sidebarExpanded
// );

// export const getAppTheme         = createSelector (getFAppLayoutState
//   , (state: IAppLayoutState) => state.theme
// );

// export const getAllAppThemes     = createSelector (getFAppLayoutState
//   , (state: IAppLayoutState) => state.themes
// );

// export const getAppThemes        = createSelector (getAppTheme, getAllAppThemes
//   , (theme: string, themes: string[]) => ({
//       selected: theme,
//       themes:  themes.map (_theme => ({ label: _theme, value: _theme }))
//   })
// );

// export const getAppVersion      = createSelector (getFAppLayoutState
//   , (state: IAppLayoutState) => state.version
// );
//e const
