import { Component, OnInit } from '@angular/core';
import {
  TranslateModule
} from '@ngx-translate/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ExecutionLogComponent } from '../execution-log/execution-log.component';
import { CommonModule } from '@angular/common';
import { isPrime, RSA } from '@sr9yar/public-key-cryptography';
import { primeValidator } from '../../validators/prime.validator';
import { coprimeValidator } from '../../validators/coprime.validator';



@Component({
  selector: 'app-rsa',
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
  templateUrl: './rsa.component.html',
  styleUrl: './rsa.component.scss',
  standalone: true,

})
export class RsaComponent implements OnInit {

  cryptosystem: any = new RSA();

  encrypted: string = '[encrypted]';

  decrypted: string = '[decrypted]';

  signature: string = '[signature]';

  form: FormGroup = new FormGroup({
    'plaintext': new FormControl(),
    'ciphertext': new FormControl(),
    // Prime
    'p': new FormControl(109, [
      primeValidator(),
      // coprimeValidator(this.mod.bind(this)),
    ]),
    // Prime
    'q': new FormControl(71, [
      primeValidator(),
    ]),

    // Public key (n = pq)
    'n': new FormControl(7739, [
      // coprimeValidator(this.mod.bind(this)),
    ]),
    // Public key
    'e': new FormControl(13, [
      coprimeValidator(this.eulerPhiFunction.bind(this), this.getCoprimeValidatorErroMessage.bind(this)),
    ]),
    // Private key
    'd': new FormControl(6397),
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
          this.cryptosystem.generateKeys();
          this.updateKeys();
        }
      }
    });

    this.form.get('q')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (isPrime(newValue)) {
          this.cryptosystem.q = newValue;
          this.cryptosystem.generateKeys();
          this.updateKeys();
        }
      }
    });

    this.form.get('n')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.cryptosystem.n = newValue;
      }
    });

    this.form.get('e')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.cryptosystem.e = newValue;
      }
    });

    this.form.get('d')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.cryptosystem.d = newValue;
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
    this.form.get('n')?.setValue(this.cryptosystem.n);
    this.form.get('e')?.setValue(this.cryptosystem.e);
    this.form.get('d')?.setValue(this.cryptosystem.d);
  }

  /**
   * Sign
   */
  sign() {
    this.signature = '[signature]';
  }

  /**
   * Plaintext string
   */
  get plaintext(): string {
    return this.cryptosystem.plaintext;
  }

  /**
   * Ciphertext string
   */
  get ciphertext(): string {
    return this.cryptosystem.ciphertext;
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

  /**
   * blocksize
   */
  get blocksize(): string {
    return this.cryptosystem.blocksize;
  }

  /**
   * Result of the Euler totient function calculation
   * @returns 
   */
  eulerPhiFunction() {
    return this.cryptosystem.eulerPhiFunction;
  }

  /**
   * Function to return custom message
   * @param n1 
   * @param n2 
   * @returns 
   */
  getCoprimeValidatorErroMessage(n1: number = 0, n2: number = 0) {
    return `φ(n) = ${this.cryptosystem.eulerPhiFunction}. Numbers ${n1} and ${n2} must be coprime.`
  }
}
