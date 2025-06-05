import { Routes } from '@angular/router';
import { CaesarComponent } from './components/caesar/caesar.component';
import { AffineComponent } from './components/affine/affine.component';
import { AffineRecurrentComponent } from './components/affine-recurrent/affine-recurrent.component';
import { HomeComponent } from './components/home/home.component';
import { TestDataComponent } from './components/test-data/test-data.component';
import { Assignment1Component } from './components/assignment-1/assignment-1.component';
import { Assignment2Component } from './components/assignment-2/assignment-2.component';
import { Assignment3Component } from './components/assignment-3/assignment-3.component';
import { RsaComponent } from './components/rsa/rsa.component';
import { RabinComponent } from './components/rabin/rabin.component';
import { ElgamalComponent } from './components/elgamal/elgamal.component';
import { EncodingsComponent } from './components/encodings/encodings/encodings.component';
import { FermatPrimalityTestComponent } from './components/fermat-primality-test/fermat-primality-test.component';
import { DigitalSignatureComponent } from './components/digital-signature/digital-signature.component';

export const routes: Routes = [
  // -----------------------

  {
    path: 'rsa',
    component: RsaComponent,
  },
  {
    path: 'rabin',
    component: RabinComponent,
  },
  {
    path: 'elgamal',
    component: ElgamalComponent,
  },
  // -----------------------
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
  // -----------------------
  {
    path: 'digital-signature',
    component: DigitalSignatureComponent,
  },
  // -----------------------

  // {
  //   path: '',
  //   component: HomeComponent,
  // },

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
    path: 'encodings',
    component: EncodingsComponent,
  },

  {
    path: 'fermat',
    component: FermatPrimalityTestComponent,
  },

  {
    path: '',
    redirectTo: '/assignment-2',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
