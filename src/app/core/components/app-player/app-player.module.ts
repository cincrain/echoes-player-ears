import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AppPlayerComponent } from './app-player.component';
import { PlayerResizerComponent } from './player-resizer/index';
import { ImageBlurComponent } from './image-blur/index';
import { MediaInfoComponent } from './media-info/index';
import { PlayerControlsComponent } from './player-controls/index';


@NgModule ({
  imports: [
    SharedModule.forRoot (),

  ],
  declarations: [
    AppPlayerComponent,
    PlayerResizerComponent,
    ImageBlurComponent,
    MediaInfoComponent,
    PlayerControlsComponent,

  ],
  exports: [
    AppPlayerComponent
  ]
})
export class AppPlayerModule {}
//e class
