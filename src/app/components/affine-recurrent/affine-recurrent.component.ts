import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { AffineRecurrent, areCoprime } from 'simple-substitution-ciphers';
import { ExecutionLogComponent } from '../execution-log/execution-log.component';
import { FrequencyAnalysisComponent } from "../frequency-analysis/frequency-analysis.component";
import { tap } from 'rxjs';
import { coprimeValidator } from '../../validators/coprime.validator';



@Component({
  selector: 'app-affine-recurrent',
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
    FrequencyAnalysisComponent
  ],
  templateUrl: './affine-recurrent.component.html',
  styleUrl: './affine-recurrent.component.scss',
  standalone: true,
})
export class AffineRecurrentComponent {
  private cipher: AffineRecurrent = new AffineRecurrent();

  encrypted: string = '[encrypted]';

  decrypted: string = '[decrypted]';

  form: FormGroup = new FormGroup({
    'plaintext': new FormControl(),
    'ciphertext': new FormControl(),
    'alphabet': new FormControl(),

    'keyA1': new FormControl(7, [
      coprimeValidator(this.mod.bind(this)),
    ]),
    'keyB1': new FormControl(14),

    'keyA2': new FormControl(5, [
      coprimeValidator(this.mod.bind(this)),
    ]),
    'keyB2': new FormControl(9),
  });

  constructor() {
    this.cipher.encrypt();
  }



  /**
   * ngOnInit
   */
  ngOnInit(): void {

    this.form.get('keyA1')?.setValue(this.cipher.a1);
    this.form.get('keyB1')?.setValue(this.cipher.b1);

    this.form.get('keyA2')?.setValue(this.cipher.a2);
    this.form.get('keyB2')?.setValue(this.cipher.b2);

    this.form.get('plaintext')?.setValue(this.cipher.plaintextString);
    this.form.get('ciphertext')?.setValue(this.cipher.ciphertextString);
    this.form.get('alphabet')?.setValue(this.cipher.alphabet.join(''));

    this.form.get('keyA1')?.valueChanges
      .pipe(tap((newValue) => {
        this.cipher.a1 = newValue;
      }))
      .subscribe({
        next: (newValue: number) => {

          if (areCoprime(newValue, this.mod()) && areCoprime(this.form.get('keyA2')?.value, this.mod())) {
            this.encrypt();
            this.decrypt();
          }
        }
      });

    this.form.get('keyB1')?.valueChanges
      .pipe(tap((newValue) => {
        this.cipher.b1 = newValue;
      }))
      .subscribe({
        next: (newValue: number) => {

          this.encrypt();
          this.decrypt();
        }
      });

    this.form.get('keyA2')?.valueChanges
      .pipe(tap((newValue) => {
        this.cipher.a2 = newValue;
      }))
      .subscribe({
        next: (newValue: number) => {

          if (areCoprime(newValue, this.mod()) && areCoprime(this.form.get('keyA1')?.value, this.mod())) {
            this.encrypt();
            this.decrypt();
          }
        }
      });

    this.form.get('keyB2')?.valueChanges
      .pipe(tap((newValue) => {
        this.cipher.b2 = newValue;
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
