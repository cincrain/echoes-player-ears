import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppNavbarComponent } from './app-navbar.component';
import { AppNavbarUserComponent } from './app-navbar-user/index';
import { AppNavbarMenuComponent } from './app-navbar-menu/index';


@NgModule ({
  imports: [
    RouterModule,
    SharedModule.forRoot (),

  ],
  declarations: [
    AppNavbarComponent,
    AppNavbarUserComponent,
    AppNavbarMenuComponent,

  ],
  exports: [
    AppNavbarComponent
  ]
})
export class AppNavbarModule {}
//e class
