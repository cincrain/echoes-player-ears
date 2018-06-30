import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { fadeInAnimation } from '@shared/animations/fade-in.animations';


function createIdMap (list: GoogleApiYouTubeVideoResource[]) {
  return list.reduce ((acc, cur) => {
    acc[cur.id] = true;
    return acc;
  }, {});
}//e function


@Component ({
  selector: 'youtube-list',
  template: `
  <ul class="list-unstyled clearfix">
    <li class="youtube-list-item" [@fadeIn]
      *ngFor="let media of list" >
      <youtube-media
        [media]="media"
        [queued]="media | isInQueue:queued"
        (play)="playSelectedVideo (media)"
        (queue)="queueSelectedVideo (media)"
        (unqueue)="unqueueSelectedVideo (media)"
        (add)="addVideo (media)" >
      </youtube-media>
    </li>
  </ul>
  `,
  styleUrls: ['./youtube-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class YoutubeListComponent implements OnInit, OnChanges {
  @Input  () list:      GoogleApiYouTubeVideoResource[] = [];
  @Input  () queued:    string[] = [];
  @Output () play       = new EventEmitter ();
  @Output () queue      = new EventEmitter ();
  @Output () unqueue    = new EventEmitter ();
  @Output () add        = new EventEmitter ();

  queuedMediaIdMap      = {};

  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  ngOnChanges ({ queued }: SimpleChanges) {
    if (queued && queued.currentValue) {
      this.queuedMediaIdMap = createIdMap (queued.currentValue);
      console.log ([`★★-->> [${Date ()}`
                  , `   -->> youtube-list.component.ts # ngOnChanges(ln:55+-)`
                  , `   -->> running createIdMap: ${JSON.stringify (this.queuedMediaIdMap)} `]
                  .join('\n') );
    }
  }//e ngOnChanges


  playSelectedVideo (media) {
    this.play.emit (media);
  }//e playSelectedVideo


  queueSelectedVideo (media) {
    this.queue.emit (media);
  }//e queueSelectedVideo


  unqueueSelectedVideo (media) {
    this.unqueue.emit (media);
  }//e unqueueSelectedVideo


  addVideo (media) {
    this.add.emit (media);
  }//e addVideo


  getMediaStatus (media: GoogleApiYouTubeVideoResource) {
    return {
      queued: this.queuedMediaIdMap[media.id]
    };
  }//e getMediaStatus
}
//e class
