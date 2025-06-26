
import { Component, OnInit } from '@angular/core';
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
  EC,
  RCR,
} from '@sr9yar/public-key-cryptography';
import { primeValidator } from '../../validators/prime.validator';
import { isPrime } from '@sr9yar/public-key-cryptography';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';




@Component({
  selector: 'app-ec',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    ExecutionLogComponent,

    TranslateModule,
  ],
  templateUrl: './ec.component.html',
  styleUrl: './ec.component.scss',
  standalone: true,
})
export class EcComponent implements OnInit {

  ec: EC = new EC();

  form: FormGroup = new FormGroup({

    // Prime
    'p': new FormControl(11, [
      primeValidator(),
    ]),

    //
    'a': new FormControl(1, [
    ]),
    //
    'b': new FormControl(1, [
    ]),


  });

  constructor() { }

  /**
  * ngOnInit
  */
  ngOnInit(): void {

    this.form.get('p')?.valueChanges.subscribe({
      next: (newValue: number) => {
        if (!isPrime(newValue)) {
          return;
        }
        this.ec.p = newValue;
      }
    });
    this.form.get('a')?.valueChanges.subscribe({
      next: (newValue: number) => {
        this.ec.a = newValue;
      }
    });
    this.form.get('b')?.valueChanges.subscribe({
      next: (newValue: number) => {
        this.ec.b = newValue;
      }
    });

  }


  /**
   * ec
   * @returns 
   */
  calc() {
    this.ec.logger?.clearLogs();
    return this.ec.research();
  }

  /**
 * logs
 */
  get logs(): string[] {
    return this.ec.logger?.logs;
  }

  /**
   * has logs
   */
  get hasLogs(): boolean {
    return !!this.ec.logger?.logs?.length;
  }



}
