import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { TooltipModule } from 'ngx-tooltip';
import { YoutubePlayerModule } from 'ngx-youtube-player';

import { SHARED_COMPONENTS } from './components/index';
import { SHARED_DIRECTIVES } from './directives/index';
import { SHARED_PIPES } from './pipes/index';


const _SHARED_MODULES = [
  InfiniteScrollModule,
  NgxTypeaheadModule,
  TooltipModule,
  YoutubePlayerModule,
];

const _SHARED_CDP = [
  ...SHARED_COMPONENTS,
  ...SHARED_DIRECTIVES,
  ...SHARED_PIPES,
];

@NgModule ({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    ..._SHARED_MODULES,

  ],
  declarations: [
    ..._SHARED_CDP,

  ],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ..._SHARED_MODULES,
    ..._SHARED_CDP,

  ]
})
export class SharedModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }//e static
}
//e class
