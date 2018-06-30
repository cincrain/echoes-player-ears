import { AnalyticsService } from "./analytics.service";
import { VersionCheckerService } from "./version-checker.service";
import { GapiLoaderService } from "./gapi-loader.service";
import { AuthorizationService } from "./authorization.service";
import { MediaParserService } from "./media-parser.service";
import { UserProfileService } from "./user-profile.service";
import { YoutubeDataApi } from "./youtube-data-api/index";
import { YoutubeVideosInfoService } from "./youtube-videos-info.service";
import { YoutubePlayerService } from "./youtube-player.service";
import { YoutubeSearchService } from "./youtube-search.service";
import { NowPlaylistService } from "./now-playlist.service";


export * from './analytics.service';
export * from './version-checker.service';
export * from './gapi-loader.service';
export * from './authorization.service';
export * from './media-parser.service';
export * from './user-profile.service';
export * from './youtube-data-api/index';
export * from './youtube-videos-info.service';
export * from './youtube-player.service';
export * from './youtube-search.service';
export * from './now-playlist.service';

export const CORE_SERVICES = [
  AnalyticsService,
  VersionCheckerService,
  GapiLoaderService,
  AuthorizationService,
  MediaParserService,
  UserProfileService,
  YoutubeDataApi,
  YoutubeVideosInfoService,
  YoutubePlayerService,
  YoutubeSearchService,
  NowPlaylistService,

];
//e const
