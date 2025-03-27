import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { Affine, ALPHABET_RUSSIAN } from 'simple-substitution-ciphers';
import { ExecutionLogComponent } from '../execution-log/execution-log.component';
import { FrequencyAnalysisComponent } from "../frequency-analysis/frequency-analysis.component";
import { tap } from 'rxjs';
import { coprimeValidator } from '../../validators/coprime.validator';
import { Language } from '../../types/language.type';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-affine',
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
    FrequencyAnalysisComponent,
    TranslateModule,
  ],
  templateUrl: './affine.component.html',
  styleUrl: './affine.component.scss',
  standalone: true,
})
export class AffineComponent implements OnInit {

  private cipher: Affine = new Affine();

  alphabetLanguage: Language = 'ru';

  encrypted: string = '[encrypted]';

  decrypted: string = '[decrypted]';

  form: FormGroup = new FormGroup({
    'plaintext': new FormControl(),
    'ciphertext': new FormControl(),
    'alphabet': new FormControl(),

    'keyA': new FormControl(7, [
      coprimeValidator(this.mod.bind(this)),
    ]),
    'keyB': new FormControl(14),
  });

  constructor() {
    this.cipher.encrypt();
  }



  /**
   * ngOnInit
   */
  ngOnInit(): void {

    this.form.get('keyA')?.setValue(this.cipher.a);
    this.form.get('keyB')?.setValue(this.cipher.b);

    this.form.get('plaintext')?.setValue(this.cipher.plaintextString);
    this.form.get('ciphertext')?.setValue(this.cipher.ciphertextString);
    this.form.get('alphabet')?.setValue(this.cipher.alphabet.join(''));

    this.form.get('keyA')?.valueChanges
      .pipe(tap((newValue) => {
        this.cipher.a = newValue;
      }))
      .subscribe({
        next: (newValue: number) => {

          this.encrypt();
          this.decrypt();
        }
      });

    this.form.get('keyB')?.valueChanges
      .pipe(tap((newValue) => {
        this.cipher.b = newValue;
      }))
      .subscribe({
        next: (newValue: number) => {

          this.encrypt();
          this.decrypt();
        }
      });

    this.form.get('alphabet')?.valueChanges
      .pipe(tap(() => {
        this.setAlphabet();
        this.encrypt();
        this.decrypt();
      }))
      .subscribe();

  }

  /**
   * Alphabet language
   */
  detectAlphabetLanguage() {
    const formAlphabet = this.form.get('alphabet')?.value;
    if (ALPHABET_RUSSIAN === formAlphabet) {
      this.alphabetLanguage = 'ru';
      return
    }
    this.alphabetLanguage = 'en';
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
    this.cipher.setAlphabet(this.form.get('alphabet')?.value);
    this.cipher.setPlaintext(this.form.get('plaintext')?.value);

    this.encrypted = this.cipher.encrypt();
  }

  /**
   * Run decryption
   */
  decrypt() {
    this.cipher.setCiphertext(this.form.get('ciphertext')?.value);
    this.decrypted = this.cipher.decrypt();
  }

  /**
   * 
   */
  setAlphabet() {
    this.cipher.setAlphabet(this.form.get('alphabet')?.value);
    this.detectAlphabetLanguage();
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

  /**
   * Mod
   */
  mod(): number {
    return this.cipher.mod;
  }
}
