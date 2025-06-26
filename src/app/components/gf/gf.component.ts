
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
  RCR,
} from '@sr9yar/public-key-cryptography';
import { primeValidator } from '../../validators/prime.validator';
import { isPrime } from '@sr9yar/public-key-cryptography';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-gf',
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

    //ExecutionLogComponent,

    TranslateModule,
  ],
  templateUrl: './gf.component.html',
  styleUrl: './gf.component.scss',
  standalone: true,

})
export class GfComponent implements OnInit {
  ngOnInit(): void {
  }
}
