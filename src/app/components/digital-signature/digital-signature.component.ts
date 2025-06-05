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



@Component({
  selector: 'app-digital-signature',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSliderModule,

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

  gost: any = new Gost(101);

  signature: string = '';

  form: FormGroup = new FormGroup({

    // Prime
    'p': new FormControl(134999, [
      primeValidator(),
    ]),

    //
    'a': new FormControl(4, [
    ]),
    //
    'b': new FormControl(1, [
    ]),

    // signature
    'signature': new FormControl(),
    // 
    'verified': new FormControl(),

    // 
    // logAddingPoints
  });

  constructor() { }

  /**
    * ngOnInit
    */
  ngOnInit(): void {
    this.form.get('p')?.setValue(this.gost.p);
    this.form.get('a')?.setValue(this.gost.p);
    this.form.get('b')?.setValue(this.gost.p);

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

  }

  /**
   * Sign message
   */
  sign(): void {
    this.gost.sign();
  }

  /**
   * Verify
   */
  verify(): void {
    this.gost.verify();
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
  get signatureVerified(): boolean {
    return this.gost.signatureVerified;
  }

}
