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

import { ElGamal } from '@sr9yar/public-key-cryptography';



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

  form: FormGroup = new FormGroup({
  });

  constructor() {
    this.cryptosystem.encrypt();
  }
  /**
   * ngOnInit
   */
  ngOnInit(): void {
  }

  /**
   * Run encryption
   */
  encrypt() {
    this.cryptosystem.encrypt();
  }

  /**
   * Run decryption
   */
  decrypt() {
    this.cryptosystem.decrypt();
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
