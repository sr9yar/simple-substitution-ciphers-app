import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { toBase64 } from '@sr9yar/public-key-cryptography';


@Component({
  selector: 'app-string-to-base64',
  imports: [

    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    TextFieldModule,

    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,

    TranslateModule,
  ],
  templateUrl: './string-to-base64.component.html',
  styleUrl: './string-to-base64.component.scss',
  standalone: true,
})
export class StringToBase64Component implements OnInit {

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
        // this.output = btoa(newValue);
        this.output = toBase64(newValue.trim());
        console.log(`btoa:\n${btoa(newValue.trim())}`)
      }
    });

  }
}
