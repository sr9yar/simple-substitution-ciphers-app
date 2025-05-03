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
import { CommonModule } from '@angular/common';
import { getAllFactors } from '@sr9yar/public-key-cryptography';


@Component({
  selector: 'app-factors',
  imports: [

    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,

    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,

    TranslateModule,
  ],
  templateUrl: './factors.component.html',
  styleUrl: './factors.component.scss',
  standalone: true,

})
export class FactorsComponent {


  form: FormGroup = new FormGroup({
    'input': new FormControl(),
  });

  output: string = '[output]';


  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.form.get('input')?.valueChanges.subscribe({
      next: (newValue: string) => {
        if (!Number.isFinite(newValue.trim())) {
          this.output = '';
        }
        const n = Number.parseInt(newValue.trim(), 10);
        const factors = getAllFactors(n);
        this.output = factors.join(', ');
      }
    });

  }
}
