import { Component, OnInit } from '@angular/core';
import { Caesar } from 'simple-substitution-ciphers';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ExecutionLogComponent } from '../execution-log/execution-log.component';
import { FrequencyAnalysisComponent } from '../frequency-analysis/frequency-analysis.component';



@Component({
  selector: 'app-caesar',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    ExecutionLogComponent,
    FrequencyAnalysisComponent,
  ],
  templateUrl: './caesar.component.html',
  styleUrl: './caesar.component.scss',
  standalone: true,
})
export class CaesarComponent implements OnInit {

  shiftMin: number = -33;
  shiftMax: number = 33;

  encrypted: string = '[encrypted]';

  decrypted: string = '[decrypted]';

  form: FormGroup = new FormGroup({
    'plaintext': new FormControl(),
    'ciphertext': new FormControl(),
    'alphabet': new FormControl(),
    'shift': new FormControl()
  });

  private cipher: Caesar = new Caesar();

  constructor() {
    this.cipher.encrypt();
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.shiftMax = this.cipher.mod;
    this.shiftMin = -this.cipher.mod;

    this.form.get('plaintext')?.setValue(this.cipher.plaintextString);
    this.form.get('ciphertext')?.setValue(this.cipher.ciphertextString);
    this.form.get('alphabet')?.setValue(this.cipher.alphabet.join(''));
    this.form.get('shift')?.setValue(this.cipher.shift);

    this.form.get('shift')?.valueChanges
      .pipe(tap(() => {
        this.encrypt();
        this.decrypt();
      }))
      .subscribe();
    this.form.get('alphabet')?.valueChanges
      .pipe(tap(() => {
        this.setAlphabet();
        this.encrypt();
        this.decrypt();
      }))
      .subscribe();


  }

  /**
   * ciphertextString
   */
  get plaintextString(): string {
    return this.cipher.plaintextString;
  }

  /**
   * ciphertextString
   */
  get ciphertextString(): string {
    return this.cipher.ciphertextString;
  }

  /**
   * Run encryption
   */
  encrypt() {
    this.cipher.shift = this.form.get('shift')?.value;
    this.cipher.setAlphabet(this.form.get('alphabet')?.value);
    this.cipher.setPlaintext(this.form.get('plaintext')?.value);

    this.encrypted = this.cipher.encrypt();
  }

  /**
   * Run decryption
   */
  decrypt() {
    this.cipher.shift = this.form.get('shift')?.value;
    this.cipher.setCiphertext(this.form.get('ciphertext')?.value);
    this.decrypted = this.cipher.decrypt();
  }

  /**
   * 
   */
  setAlphabet() {
    this.cipher.setAlphabet(this.form.get('alphabet')?.value);
    this.shiftMax = this.cipher.mod;
    this.shiftMin = -this.cipher.mod;
  }

  /**
   * logs
   */
  get logs(): string[] {
    return this.cipher.logs;
  }

  /**
   * has logs
   */
  get hasLogs(): boolean {
    return !!this.cipher.logs.length;
  }
}
