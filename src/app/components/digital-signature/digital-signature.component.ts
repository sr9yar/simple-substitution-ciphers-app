import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ExecutionLogComponent } from '../execution-log/execution-log.component';
import { CommonModule } from '@angular/common';
import {
  Gost,
} from '@sr9yar/digital-signature';
import { primeValidator } from '../../validators/prime.validator';
import { isPrime } from '@sr9yar/public-key-cryptography';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@Component({
  selector: 'app-digital-signature',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    ExecutionLogComponent,

    TranslateModule,
  ],
  templateUrl: './digital-signature.component.html',
  styleUrl: './digital-signature.component.scss',
  standalone: true,
})
export class DigitalSignatureComponent {

  gost: Gost = new Gost(13499, 110, 159);

  signature: string = '[signature]';

  m: number = 13628;
  q: number = 6814;

  form: FormGroup = new FormGroup({

    // Prime
    'p': new FormControl(13499, [
      primeValidator(),
    ]),

    //
    'a': new FormControl(110, [
    ]),
    //
    'b': new FormControl(159, [
    ]),

    // message to sign
    'message': new FormControl('APR'),
    // signature
    'signature': new FormControl(),
    // logAddingPoints
    'logAddingPoints': new FormControl(),
  });

  constructor() { }

  /**
    * ngOnInit
    */
  ngOnInit(): void {

    // this.form.get('p')?.setValue(this.gost.p, { emitEvent: false });
    // this.form.get('a')?.setValue(this.gost.a, { emitEvent: false });
    // this.form.get('b')?.setValue(this.gost.b, { emitEvent: false });
    // this.form.get('logAddingPoints')?.setValue(this.gost.logAddingPoints, { emitEvent: false });

    this.form.get('message')?.setValue(this.gost.M, { emitEvent: false });
    this.form.get('signature')?.setValue(this.gost.signature, { emitEvent: false });

    this.form.get('p')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (!isPrime(newValue)) {
          return;
        }
        this.gost.p = newValue;
      }
    });
    this.form.get('a')?.valueChanges.subscribe({
      next: (newValue: number) => {
        this.gost.a = newValue;
      }
    });
    this.form.get('b')?.valueChanges.subscribe({
      next: (newValue: number) => {
        this.gost.b = newValue;
      }
    });

    this.form.get('logAddingPoints')?.valueChanges.subscribe({
      next: (newValue: boolean) => {

        this.gost.logAddingPoints = !!newValue;

        if (!!this.gost.logAddingPoints) {

          const p = this.form.get('p')?.value;
          const a = this.form.get('a')?.value;
          const b = this.form.get('b')?.value;

          this.gost.setDomainParameters(
            p, a, b,
          );

        }
      }
    });

    this.form.get('message')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.gost.M = newValue;
      }
    });
    this.form.get('signature')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.gost.signature = newValue;
      }
    });
  }

  /**
   * Sign message
   */
  sign(): void {
    const signature = this.gost.sign();
    this.signature = signature;
    // this.form.get('signature')?.setValue(signature, { emitEvent: false });
  }

  /**
   * Verify
   */
  verify(): void {
    this.gost.verify();
  }

  /**
   * Generate params
   */
  generateParams(): void {
    this.gost.setDomainParameters();

    this.m = this.gost.m;
    this.q = this.gost.q;

    this.form.get('p')?.setValue(this.gost.p, { emitEvent: false });
    this.form.get('a')?.setValue(this.gost.a, { emitEvent: false });
    this.form.get('b')?.setValue(this.gost.b, { emitEvent: false });
  }

  /**
   * logs
   */
  get logs(): string[] {
    return this.gost.logger?.logs;
  }

  /**
   * has logs
   */
  get hasLogs(): boolean {
    return !!this.gost.logger?.logs?.length;
  }

  /**
   * Signature verified
   */
  get signatureVerified(): string {
    if (typeof this.gost.signatureVerified !== 'boolean') {
      return '';
    }
    return this.gost.signatureVerified ? 'VALID' : 'INVALID';
  }

}
