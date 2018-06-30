import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppNavbarModule } from '@containers/app-navbar/index';
import { PlaylistViewModule } from '@containers/playlist-view/index';
import { USER_ROUTES } from './user-routes';

import { UserComponent } from './user.component';
import { PlaylistsComponent } from './playlists/index';
import { AuthGuard } from './user.guard';
import { UserPlayerService } from './user-player.service';


@NgModule ({
  imports: [
    RouterModule.forChild ([...USER_ROUTES]), 
    SharedModule.forRoot (),
    AppNavbarModule,
    PlaylistViewModule.forRoot (),

  ],
  declarations: [
    UserComponent,
    PlaylistsComponent,

  ],
  exports: [
    UserComponent
  ],
  providers: [
    AuthGuard,
    UserPlayerService,

  ]
})
export class UserModule {}
//e class
