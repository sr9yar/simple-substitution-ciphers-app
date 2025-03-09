import { Routes } from '@angular/router';
import { CaesarComponent } from './components/caesar/caesar.component';
import { AffineComponent } from './components/affine/affine.component';
import { AffineRecurrentComponent } from './components/affine-recurrent/affine-recurrent.component';

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
];
