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
import { RSA } from '@sr9yar/public-key-cryptography';
import { primeValidator } from '../../validators/prime.validator';



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
      //coprimeValidator(this.mod.bind(this)),
    ]),
    // Public key
    'e': new FormControl(13),
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
      next: (newValue: string) => {
        this.cryptosystem.p = newValue;
      }
    });

    this.form.get('q')?.valueChanges.subscribe({
      next: (newValue: string) => {
        this.cryptosystem.q = newValue;
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
}
