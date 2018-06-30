import { AppNavbarModule } from "./app-navbar/index";
import { AppSearchModule } from "./app-search/index";
import { PlaylistViewModule } from "./playlist-view/index";


export const APP_CONTAINERS_MODULES = [
  AppNavbarModule,
  AppSearchModule.forRoot (),
  PlaylistViewModule.forRoot (),

];
//e const
