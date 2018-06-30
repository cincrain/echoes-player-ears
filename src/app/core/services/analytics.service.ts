import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const gtag;

const Events = {
  Login: {
    NAME:  'login',
    LABEL: 'method'
  },
  Search: {
    NAME:  'search',
    LABEL: 'search_term'
  }
}; //e const

const CustomEvents = {
  VIDEO_PLAY: 'video_play'
}; //e const



@Injectable ()
export class AnalyticsService {
  private projectId = window['GA_PROJECT_ID'];
  private gtag:     any;

  constructor () {
    this.assignGtag ();
  }//e constructor


  assignGtag () {
    const hasGtagLoaded = 'gtag' in window;
    if (!hasGtagLoaded) {
      console.log ([`★★-->> [${Date ()}`
                  , `   -->> analytics.service.ts # assignGtag(ln:36+-)`
                  , `   -->> GTAG HAS NOT BEEN LOADED!! `]
                  .join('\n') );
    }
    this.gtag = hasGtagLoaded ? gtag : () => undefined;
  }//e assignGtag


  trackPage (page) {
    this.gtag ('config', this.projectId, {
      page_title:      page,
      page_location:   location.origin,
      page_path:       location.hash
    });
  }//e trackPage


  trackSearch (searchType) {
    this.gtag ('event', Events.Search.NAME, {
      [Events.Search.LABEL]: searchType
    });
  }//e trackSearch


  trackSignin () {
    this.gtag ('event', Events.Login.NAME, { [Events.Login.LABEL]: 'Google' });
  }//e trackSignin


  trackVideoPlay () {
    this.gtag ('event', CustomEvents.VIDEO_PLAY);
  }//e trackVideoPlay
}
//e constructor
