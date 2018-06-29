import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CORE_COMPONENTS_MODULES } from './core/components/index';
import { APP_CONTAINERS_MODULES } from './containers/index';

import { AppComponent } from './app.component';


@NgModule ({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule, HttpClientJsonpModule,
    RouterModule.forRoot (ROUTES, { useHash: true }),

    CoreModule.forRoot (),
    SharedModule.forRoot (),
    ...CORE_COMPONENTS_MODULES,
    ...APP_CONTAINERS_MODULES,

  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
//e class
