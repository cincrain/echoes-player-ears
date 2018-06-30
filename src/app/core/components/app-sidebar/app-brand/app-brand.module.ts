import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AppBrandComponent } from './app-brand.component';


@NgModule ({
  imports: [
    SharedModule.forRoot (),

  ],
  declarations: [
    AppBrandComponent
  ],
  exports: [
    AppBrandComponent
  ]
})
export class AppBrandModule {}
//e class
