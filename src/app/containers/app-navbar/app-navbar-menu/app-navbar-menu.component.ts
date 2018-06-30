import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy, HostListener
} from '@angular/core';
import  { expandFadeInAnimation } from '@shared/animations/fade-in.animations';


enum Key {
  Backspace   = 8,
  Tab         = 9,
  Enter       = 13,
  Shift       = 16,
  Escape      = 27,
  ArrowLeft   = 37,
  ArrowRight  = 39,
  ArrowUp     = 38,
  ArrowDown   = 40
}//e enum


@Component ({
  selector: 'app-navbar-menu',
  template: `
  <button class="btn btn-navbar btn-link ux-maker btn-toggle"
    (click)="toggleMenu ()" >
    <icon name="ellipsis-v"></icon>
    <icon name="dot-circle-o" class="pulse update-indicator text-primary"
      *ngIf="appVersion.isNewAvailable" >
    </icon>
  </button>
  <div *ngIf="!hide" class="menu-backdrop"
    (click)="hideMenu ()" >
  </div>

  <div class="panel menu-dropdown"
    [class.end-animation]="end"
    [@expandFadeIn]="menuState"
    (@expandFadeIn.done)="endAnimation ($event)" >
    <div class="list-group">
      <div *ngIf="appVersion.isNewAvailable" class="list-group-item">
        <button class="btn btn-success" title="click to update Echoes"
          (click)="handleUpdateVersion ()" >
          New Version is Available - UPDATE NOW
        </button>
      </div>
      <a href="http://github.com/orizens/echoes-player"
        class="list-group-item" target="_blank" >
        <icon name="github"></icon>
        Source Code @Github
      </a>
      <a href="https://travis-ci.org/orizens/echoes-player"
        *ngIf="!hide" class="list-group-item" target="_blank" >
        <img src="https://travis-ci.org/orizens/echoes-player.svg?branch=master">
      </a>
      <div class="list-group-item" target="_blank">
        v.<a href="https://github.com/orizens/echoes-player/blob/master/CHANGELOG.md" target="_blank">
          {{ appVersion.semver }}
        </a>
        <button *ngIf="!appVersion.isNewAvailable" class="btn btn-info"
          (click)="handleCheckVersion ()" >
          Check For Updates
        </button>
        <div *ngIf="appVersion.checkingForVersion" class="text-info">
          checking for version...
        </div>
      </div>
      <div class="list-group-item">
        Theme:
        <button-group
          [buttons]="theme.themes"
          [selectedButton]="theme.selected"
          (buttonClick)="handleUpdateTheme ($event)" >
        </button-group>
      </div>
      <a href="http://orizens.com" class="list-group-item" target="_blank">
        Made with <icon name="heart" class="text-danger"></icon> By Orizens
      </a>
      <button *ngIf="signedIn" class="list-group-item"
        (click)="handleSignOut ()" >
        <icon name="sign-out"></icon> Sign Out
      </button>
    </div>
  </div>
  `,
  styleUrls: ['./app-navbar-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandFadeInAnimation]
})
export class AppNavbarMenuComponent implements OnInit {
  end     = false;
  hide    = true;
  get menuState () {
    return this.hide ? 'hide' : 'show';
  }//e menuState

  @Input  () appVersion = {
    semver:             '',
    isNewAvailable:     false,
    checkingForVersion: false
  };

  @Input  () theme         = {  themes: [], selected: '' };
  @Input  () signedIn      = false;
  @Output () changeTheme   = new EventEmitter ();
  @Output () signOut       = new EventEmitter ();
  @Output () updateVersion = new EventEmitter ();
  @Output () checkVersion  = new EventEmitter ();

  @HostListener ('keyup', ['$event'])
  handleKeyPress (event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideMenu ();
    }
  }//e handleKeyPress


  constructor () {
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  hideMenu () {
    this.hide = true;
  }//e hideMenu


  toggleMenu () {
    this.end    = false;
    this.hide   = !this.hide;
  }// etoggleMenu


  handleSignOut () {
    this.signOut.emit ();
  }//e handleSignOut


  handleUpdateVersion () {
    this.updateVersion.emit ();
  }//e handleUpdateVersion


  handleCheckVersion () {
    this.checkVersion.emit ();
  }//e handleCheckVersion


  handleUpdateTheme (theme) {
    this.changeTheme.emit (theme);
  }//e handleUpdateTheme


  endAnimation ({ toState }) {
    if (toState === 'hide') {
      console.log ([`★★-->> [${Date ()}`
                  , `   -->> app-navbar-menu.component.ts # endAnimation(ln:156+-)`
                  , `   -->> (@expandFadeIn.DONE) this.end: ${toState} `]
                  .join('\n') );
      this.end = true;
    }
  }//e endAnimation
}
//e class
