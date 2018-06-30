import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { AppNavigatorComponent } from './app-navigator.component';


@NgModule ({
  imports: [
    RouterModule,
    SharedModule.forRoot (),
  ],
  declarations: [
    AppNavigatorComponent,
  ],
  exports: [
    AppNavigatorComponent
  ]
})
export class AppNavigatorModule {}
//e class
