import { Routes } from '@angular/router';


export const ROUTES: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: './containers/user/user.module#UserModule'
  }
];
//e const
