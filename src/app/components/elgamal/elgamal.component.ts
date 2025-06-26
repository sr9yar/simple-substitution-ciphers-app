import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ExecutionLogComponent } from '../execution-log/execution-log.component';
import { CommonModule } from '@angular/common';

import {
  ElGamal,
  isPrime,
  findOrderInGroup,
} from '@sr9yar/public-key-cryptography';
import { primeValidator } from '../../validators/prime.validator';



@Component({
  selector: 'app-elgamal',
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
  templateUrl: './elgamal.component.html',
  styleUrl: './elgamal.component.scss',
  standalone: true,

})
export class ElgamalComponent implements OnInit {

  cryptosystem: any = new ElGamal(13499);

  encrypted: string = '[encrypted]';

  decrypted: string = '[decrypted]';

  signature: string = '[signature]';

  gHint: string = '';

  form: FormGroup = new FormGroup({

    'plaintext': new FormControl('crypto'),
    'ciphertext': new FormControl(),
    // Prime
    'p': new FormControl(134999, [
      primeValidator(),
    ]),

    // g ∈ F*ₚ
    'g': new FormControl(13496, [
      // factorValidator(this.getP.bind(this)),
    ]),
    // Session key
    'k': new FormControl(1616, [
    ]),

    // Private key. 1 < x < p - 1
    'x': new FormControl(5049, [
    ]),
    // Public key. h = g ^ x (mod p)
    'h': new FormControl(5581, [
    ]),



  });

  constructor() {
    this.cryptosystem.plaintext = 'crypto';
    this.cryptosystem.p = 13499;
    this.cryptosystem.g = 13496;
    this.cryptosystem.x = 5049;
    this.cryptosystem.k = 1616;
    this.cryptosystem.h = 5581;
    this.cryptosystem.generateG();
    this.cryptosystem.encrypt(1616);
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {

    this.form.get('plaintext')?.setValue(this.cryptosystem.plaintext);
    this.form.get('ciphertext')?.setValue(this.cryptosystem.ciphertext);

    this.form.get('p')?.setValue(this.cryptosystem.p);
    this.form.get('g')?.setValue(this.cryptosystem.g);
    this.form.get('k')?.setValue(this.cryptosystem.k);
    this.form.get('x')?.setValue(this.cryptosystem.x);
    this.form.get('h')?.setValue(this.cryptosystem.h);

    this.form.get('plaintext')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.cryptosystem.plaintext = newValue;
      }
    });

    this.form.get('ciphertext')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.cryptosystem.ciphertext = newValue;
      }
    });

    this.form.get('p')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (!isPrime(newValue)) {
          return;
        }
        const k = this.form.get('p')?.value;
        // this.cryptosystem.clearLogs();
        this.cryptosystem.p = newValue;
        // this.cryptosystem.generateG();
        // this.cryptosystem.generateKeys();
        this.updateKeys();
        this.encrypt(k);

      }
    });
    this.form.get('g')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (Number.isFinite(newValue)) {
          const p = this.form.get('p')?.value;
          const g = newValue;
          this.gHint = `Order of ${g}: ${findOrderInGroup(g, p)}`;
          this.cryptosystem.g = newValue;
          // this.cryptosystem.generateKeys();
          this.updateKeys();
        }
      }

    });
    this.form.get('x')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (Number.isFinite(newValue)) {
          this.cryptosystem.g = newValue;
        }
      }
    });
    this.form.get('h')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (Number.isFinite(newValue)) {
          this.cryptosystem.h = newValue;
        }
      }
    });
    this.form.get('k')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (Number.isFinite(newValue)) {
          this.cryptosystem.k = newValue;
        }
      }
    });
  }

  /**
   * Generate keys
   */
  generateKeys() {
    this.cryptosystem.generateKeys();
    this.encrypt();
  }

  /**
   * Run encryption
   */
  encrypt(sessionKey?: number) {
    this.cryptosystem.clearLogs();
    this.encrypted = this.cryptosystem.encrypt(sessionKey);
    this.updateKeys();
  }

  /**
   * Run decryption
   */
  decrypt() {
    this.cryptosystem.clearLogs();
    this.decrypted = this.cryptosystem.decrypt();
  }

  /**
   * Update keys
   */
  updateKeys() {
    this.form.get('g')?.setValue(this.cryptosystem.g, { emitEvent: false });
    this.form.get('k')?.setValue(this.cryptosystem.k, { emitEvent: false });

    this.form.get('x')?.setValue(this.cryptosystem.x, { emitEvent: false });
    this.form.get('h')?.setValue(this.cryptosystem.h, { emitEvent: false });
  }

  /**
   * Get p
   */
  getP(): number {
    return this.cryptosystem.p;
  }

  /**
   * Sign
   */
  sign() {
    this.signature = '[signature]';
  }

  /**
   * blocksize
   */
  get blocksize(): string {
    return this.cryptosystem.blocksize;
  }

  /**
   * logs
   */
  get logs(): string[] {
    return this.cryptosystem.logger?.logs;
  }

  /**
   * has logs
   */
  get hasLogs(): boolean {
    return !!this.cryptosystem.logger?.logs?.length;
  }

}
