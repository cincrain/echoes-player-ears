import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy
} from '@angular/core';


@Component ({
  selector: 'youtube-media',
  templateUrl: './youtube-media.html',
  styleUrls: ['./youtube-media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeMediaComponent implements OnInit {
  @Input  () media:      GoogleApiYouTubeVideoResource;
  @Input  () queued      = false;
  @Output () play        = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () queue       = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () unqueue     = new EventEmitter<GoogleApiYouTubeVideoResource> ();
  @Output () add         = new EventEmitter<GoogleApiYouTubeVideoResource> ();

  showDesc   = false;
  isPlaying  = false;

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  handlePlayVideo (media: GoogleApiYouTubeVideoResource) {
    this.play.emit (media);
  }//e handlePlayVideo


  handleQueueVideo (media: GoogleApiYouTubeVideoResource) {
    this.queue.emit (media);
  }//e handleQueueVideo


  handleUnqueueVideo (media: GoogleApiYouTubeVideoResource) {
    this.unqueue.emit (media);
  }//e handleUnqueueVideo


  handleAddVideo (media: GoogleApiYouTubeVideoResource) {
    this.add.emit (media);
  }//e handleAddVideo


  handleToggle (showDesc: boolean) {
    this.showDesc = !showDesc;
  }//e handleToggle
}
//e class
