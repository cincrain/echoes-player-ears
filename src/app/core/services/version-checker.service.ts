import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppApi } from '@core/api/app.api';

import { Subscription, of, timer } from 'rxjs';
import { filter, switchMap, retry, take, catchError } from 'rxjs/operators';


interface INpmPackagejson {
  version:         number;
  [param: string]: any;
}//e interface


function verifyPackage (packageJson: INpmPackagejson) {
  return packageJson.hasOwnProperty ('version');
}//e function


@Injectable ()
export class VersionCheckerService {
  private interval   = 1000 * 60 * 60; // 1 hr
  private protocol   = 'https';
  private prefix     = 'raw.githubusercontent.com';
  private repo       = 'orizens/echoes-player';
  private repoBranch = 'gh-pages';
  private pathToFile = 'assets/package.json';
  public  url = `${this.protocol}://${this.prefix}/${this.repo}/${this.repoBranch}/${this.pathToFile}`;

  constructor (
    private http: HttpClient
    , private zone: NgZone
    , private appApi: AppApi
  ) {
  }//e constructor


  check () {
    return this.http.get (this.url);
  }//e check


  start () {
    let checkTimer: Subscription;
    this.zone.runOutsideAngular (() => {
      checkTimer = timer (0, this.interval).pipe (
        switchMap (() => this.check ())
        , catchError (err => {
          console.log ([`★★-->> [${Date ()}`
                      , `   -->> version-checker.service.ts # start(ln:49+-)`
                      , `   -->> SCHEDULE ERROR: ${JSON.stringify (err)} `]
                      .join('\n') );
          return of (err);
        })
        , retry ()
        , filter (verifyPackage)
      )
      .subscribe (res => {
        console.log ([`★★-->> [${Date ()}`
                    , `   -->> version-checker.service.ts # subscribe(ln:59+-)`
                    , `   -->> VERSION RECEIVED: ${JSON.stringify (res)} `]
                    .join('\n') );
        this.appApi.receivedNewVersion (res);
      });
    });

    return checkTimer;
  }//e start


  updateVersion () {
    if (window) {
      window.location.reload (true);
    }
  }//e updateVersion


  checkForVersion () {
    return this.check ().pipe (
      retry ()
      , filter (verifyPackage)
      , take (1)
    )
    .subscribe (res => this.appApi.notifyNewVersion (res));
  }//e checkForVersion
}
//e class
