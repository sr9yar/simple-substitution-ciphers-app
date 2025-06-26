import { Component } from '@angular/core';
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
  RCR,
} from '@sr9yar/public-key-cryptography';
import { primeValidator } from '../../validators/prime.validator';
import { isPrime } from '@sr9yar/public-key-cryptography';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



/**
 * 
 */
@Component({
  selector: 'app-rcr',
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
  templateUrl: './rcr.component.html',
  styleUrl: './rcr.component.scss',
  standalone: true,
})
export class RcrComponent {

  rcr: RCR = new RCR(14, 5);

  form: FormGroup = new FormGroup({

    // Порядок группы
    // |G| = n
    'n': new FormControl(14, [
    ]),
    // элемент, порядок которого нужно найти

    'l': new FormControl(5, [
      // primeValidator(),
    ]),


  });

  constructor() { }

  /**
  * ngOnInit
  */
  ngOnInit(): void {

    this.form.get('n')?.valueChanges.subscribe({
      next: (newValue: number) => {
        // if (!isPrime(newValue)) {
        //   return;
        // }
        this.rcr.n = newValue;
      }
    });
    this.form.get('l')?.valueChanges.subscribe({
      next: (newValue: number) => {
        this.rcr.l = newValue;
      }
    });

  }

  /**
   * calc
   * @returns 
   */
  calc() {
    this.rcr.logger?.clearLogs();
    return this.rcr.research();
  }

  /**
   * logs
   */
  get logs(): string[] {
    return this.rcr.logger?.logs;
  }

  /**
   * has logs
   */
  get hasLogs(): boolean {
    return !!this.rcr.logger?.logs?.length;
  }

}
