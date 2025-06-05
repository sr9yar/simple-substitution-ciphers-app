import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
import { FermatPrimalityTest } from '@sr9yar/public-key-cryptography';
import { BehaviorSubject, tap } from 'rxjs';





@Component({
  selector: 'app-fermat-primality-test',
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
  templateUrl: './fermat-primality-test.component.html',
  styleUrl: './fermat-primality-test.component.scss',
  standalone: true,
})
export class FermatPrimalityTestComponent {

  f: FermatPrimalityTest = new FermatPrimalityTest();

  result: BehaviorSubject<string> = new BehaviorSubject('[not tested]');

  form: FormGroup = new FormGroup({

    'n': new FormControl(),
    'k': new FormControl(),

  });

  isPrime: boolean = false;

  constructor(
    private readonly translate: TranslateService,
  ) {

    this.translate.onLangChange.subscribe(() => {
      this.updateTranslations();
    });

  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.form.get('n')?.setValue(this.f.n);
    this.form.get('k')?.setValue(this.f.k);

    this.form.get('n')?.valueChanges.subscribe({
      next: (newValue: string) => {
        if (Number.isFinite(newValue)) {
          this.f.setNumber(Number.parseInt(newValue, 10));
        }
      }
    });
    this.form.get('k')?.valueChanges.subscribe({
      next: (newValue: string) => {
        if (Number.isFinite(newValue)) {
          this.f.setNumberOfIterations(Number.parseInt(newValue, 10));
        }
      }
    });

  }

  /**
   * Run test
   */
  test(): void {
    if (typeof this.f.logger?.clearLogs === 'function') {
      this.f.logger.clearLogs();
    }
    this.isPrime = this.f.isPrime();
    this.updateTranslations();
  }

  /**
   * 
   */
  updateTranslations() {
    let slug: string = 'common.number-is-not-prime';

    if (this.isPrime) {
      slug = 'common.number-is-prime';
    }

    this.translate.get(slug)
      .pipe(tap((v: string) => this.result.next(v)))
      .subscribe();
  }

  /**
   * logs
   */
  get logs(): string[] {
    return this.f.logger?.logs || [];
  }

  /**
   * has logs
   */
  get hasLogs(): boolean {
    return !!this.f.logger?.logs?.length;
  }

}
