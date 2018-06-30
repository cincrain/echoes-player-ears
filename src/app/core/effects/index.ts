import { RouterStoreEffects } from "./router-store.effects";
import { AppLayoutEffects } from "./app-layout.effects";
import { UserProfileEffects } from "./user-profile.effects";
import { AppPlayerEffects } from "./app-player.effects";
import { NowPlaylistEffects } from "./now-playlist.effects";
import { PlayerSearchEffects } from "./player-search.effects";
import { AnalyticsEffects } from "./analytics.effects";


export * from './analytics.effects';
export * from './router-store.effects';
export * from './app-layout.effects';
export * from './user-profile.effects';
export * from './app-player.effects';
export * from './now-playlist.effects';
export * from './player-search.effects';

export const CORE_EFFECTS = [
  AnalyticsEffects,
  RouterStoreEffects,
  AppLayoutEffects,
  UserProfileEffects,
  AppPlayerEffects,
  NowPlaylistEffects,
  PlayerSearchEffects,

];
//e const
