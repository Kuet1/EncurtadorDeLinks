import { Routes } from '@angular/router';
import { Details } from './pages/details/details';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'links/:code', component: Details },
  { path: '**', component: NotFound },
];
