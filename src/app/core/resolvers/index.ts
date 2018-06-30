import { PlaylistVideosResolver } from "./playlist-videos.resolver";
import { PlaylistResolver } from "./playlist.resolver";


export * from './playlist-videos.resolver';
export * from './playlist.resolver'

export const CORE_RESOLVERS = [
  PlaylistVideosResolver,
  PlaylistResolver,

];
//e const
