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

import { ElGamal, isPrime } from '@sr9yar/public-key-cryptography';
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

  cryptosystem: any = new ElGamal();

  encrypted: string = '[encrypted]';

  decrypted: string = '[decrypted]';

  form: FormGroup = new FormGroup({

    'plaintext': new FormControl(),
    'ciphertext': new FormControl(),
    // Prime
    'p': new FormControl(211, [
      primeValidator(),
    ]),

    // g ∈ F*ₚ
    'g': new FormControl(3, [
    ]),
    // Session key
    'k': new FormControl(7, [
    ]),

    // Private key. 1 < x < p - 1
    'x': new FormControl(35, [
    ]),
    // Public key. h = g ^ x (mod p)
    'h': new FormControl(197, [
    ]),



  });

  constructor() {
    this.cryptosystem.encrypt();
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
        if (isPrime(newValue)) {
          this.cryptosystem.p = newValue;
          this.cryptosystem.generateG();
          this.cryptosystem.generateKeys();
          this.updateKeys();
        }
      }
    });

  }

  /**
   * Run encryption
   */
  encrypt() {
    this.encrypted = this.cryptosystem.encrypt();
  }

  /**
   * Run decryption
   */
  decrypt() {
    this.decrypted = this.cryptosystem.decrypt();
  }

  /**
   * Update keys
   */
  updateKeys() {
    this.form.get('g')?.setValue(this.cryptosystem.g);
    this.form.get('k')?.setValue(this.cryptosystem.k);

    this.form.get('x')?.setValue(this.cryptosystem.x);
    this.form.get('h')?.setValue(this.cryptosystem.h);

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
