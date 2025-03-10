import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { AffineRecurrent } from 'simple-substitution-ciphers';
import { ExecutionLogComponent } from '../execution-log/execution-log.component';

@Component({
  selector: 'app-affine-recurrent',
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
  ],
  templateUrl: './affine-recurrent.component.html',
  styleUrl: './affine-recurrent.component.scss',
  standalone: true,
})
export class AffineRecurrentComponent {
  private cipher: AffineRecurrent = new AffineRecurrent();


  constructor() {
    this.cipher.encrypt();
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

  encrypt() {
    this.cipher.encrypt()
  }

  decrypt() {
    this.cipher.decrypt()
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
