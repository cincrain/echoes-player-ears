import { SearchPipe } from "./search.pipe";
import { ToFriendlyDurationPipe } from "./toFriendlyDuration.pipe";
import { VideoToThumbPipe } from "./videoToThumb.pipe";
import { ParseTracksPipe } from "./parseTrack.pipe";
import { IsInQueuePipe } from "./isInQueue.pipe";


export const SHARED_PIPES = [
  SearchPipe,
  ToFriendlyDurationPipe,
  VideoToThumbPipe,
  ParseTracksPipe,
  IsInQueuePipe,

];
//e const
