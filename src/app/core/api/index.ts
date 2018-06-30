import { AppApi } from "./app.api";
import { AppPlayerApi } from "./app-player.api";


export * from './app.api';
export * from './app-player.api';

export const CORE_API = [
  AppApi,
  AppPlayerApi,

];
//e const
