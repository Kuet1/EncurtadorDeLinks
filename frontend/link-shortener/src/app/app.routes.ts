import { Routes } from '@angular/router';
import { Details } from './pages/details/details';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'links/:code', component: Details },
];
