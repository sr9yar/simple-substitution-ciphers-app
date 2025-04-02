import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {
  fromBase64,
} from '@sr9yar/public-key-cryptography';


@Component({
  selector: 'app-base64-to-string',
  imports: [

    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,

    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,

    TranslateModule,
  ],
  templateUrl: './base64-to-string.component.html',
  styleUrl: './base64-to-string.component.scss',
  standalone: true,
})
export class Base64ToStringComponent implements OnInit {


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
        // this.output = atob(newValue);
        this.output = fromBase64(newValue.trim());
        console.log(`atob:\n${atob(newValue.trim())}`)
      }
    });

  }
}
