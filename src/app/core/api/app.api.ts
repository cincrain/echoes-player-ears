import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AppTopLevelFRS from '@store/freducers-selectors';
import * as AppLayoutARS from '@store/app-layout/index';
import * as UserProfileARS from '@store/user-profile/index';
import * as RouterStoreARS from '@store/router-store/index';


@Injectable ()
export class AppApi {
 sidebarCollapsed$ = this.store.pipe (select (AppTopLevelFRS.AppLayoutState.getSidebarCollapsed));
 themes$           = this.store.pipe (select (AppTopLevelFRS.AppLayoutState.getAppThemes));
 appVersion$       = this.store.pipe (select (AppTopLevelFRS.AppLayoutState.getAppVersion));
 userProfileState$ = this.store.pipe (select (AppTopLevelFRS.getFUserProfileState));

  constructor (private store: Store<AppTopLevelFRS.IEchoesState>) {
  }//e constructor


  changeTheme (theme: string) {
    this.store.dispatch (new AppLayoutARS.ChangeAppThemeE0R1 (theme));
  }//e changeTheme


  updateVersion () {
    this.store.dispatch (new AppLayoutARS.UpdateAppVersionE1R0 ());
  }//e updateVersion


  checkVersion () {
    this.store.dispatch (new AppLayoutARS.CheckAppVersionE1R1 ());
  }//e chekcVersion


  notifyNewVersion (res) {
    this.store.dispatch (new AppLayoutARS.AppVersionReceivedE0R1 (res));
  }//e notifyNewVersion


  receivedNewVersion (res) {
    this.store.dispatch (new AppLayoutARS.AppVersionReceivedE0R1 (res));
  }//e receivedNewVersion


  toggleSidebar () {
    this.store.dispatch (new AppLayoutARS.ToggleSidebarE0R1 ());
  }//e toggleSidebar


  // navigation
  navigateBack () {
  this.store.dispatch (new RouterStoreARS.BackE1R0 ());
  }
  

  // user authorization
  signInUser () {
    this.store.dispatch (new UserProfileARS.SigninUserE1R0 ());
  }//e signInUser


  checkUserAuth () {
    this.store.dispatch (new UserProfileARS.CheckUserAuthE1R0 ());
  }//e checkUserAuth


  signOutUser () {
    this.store.dispatch (new UserProfileARS.SignoutUserE1R0 ());
  }//e signOutUser

}
//e class
