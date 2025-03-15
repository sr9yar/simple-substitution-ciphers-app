import { Routes } from '@angular/router';
import { CaesarComponent } from './components/caesar/caesar.component';
import { AffineComponent } from './components/affine/affine.component';
import { AffineRecurrentComponent } from './components/affine-recurrent/affine-recurrent.component';
import { HomeComponent } from './components/home/home.component';
import { TestDataComponent } from './components/test-data/test-data.component';
import { Assignment1Component } from './components/assignment-1/assignment-1.component';
import { Assignment2Component } from './components/assignment-2/assignment-2.component';
import { Assignment3Component } from './components/assignment-3/assignment-3.component';

export const routes: Routes = [
  {
    path: 'caesar',
    component: CaesarComponent,
  },
  {
    path: 'affine',
    component: AffineComponent,
  },
  {
    path: 'affine-recurrent',
    component: AffineRecurrentComponent,
  },
  {
    path: 'test-data',
    component: TestDataComponent,
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  // },
  {
    path: '',
    redirectTo: '/assignment-1',
    pathMatch: 'full',
  },
  {
    path: 'assignment-1',
    component: Assignment1Component,
  },
  {
    path: 'assignment-2',
    component: Assignment2Component,
  },
  {
    path: 'assignment-3',
    component: Assignment3Component,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
