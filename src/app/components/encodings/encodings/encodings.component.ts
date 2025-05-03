import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Base64ToStringComponent } from '../base64-to-string/base64-to-string.component';
import { StringToBase64Component } from '../string-to-base64/string-to-base64.component';
import { MatDividerModule } from '@angular/material/divider';
import { PrimeNumbers10KComponent } from "../prime-numbers-10-k/prime-numbers-10-k.component";
import { PrimeNumbersComponent } from '../prime-numbers/prime-numbers.component';
import { FactorsComponent } from "../factors/factors.component";
import { PrimeFactorsComponent } from '../prime-factors/prime-factors.component';

@Component({
  selector: 'app-encodings',
  imports: [
    MatDividerModule,
    TranslateModule,
    Base64ToStringComponent,
    StringToBase64Component,
    PrimeNumbers10KComponent,
    PrimeNumbersComponent,
    FactorsComponent,
    PrimeFactorsComponent,

  ],
  templateUrl: './encodings.component.html',
  styleUrl: './encodings.component.scss',
  standalone: true,
})
export class EncodingsComponent {

}
