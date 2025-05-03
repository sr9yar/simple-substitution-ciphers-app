import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  PRIME_NUMBERS_10K,
} from '@sr9yar/public-key-cryptography';


@Component({
  selector: 'app-prime-numbers-10-k',
  imports: [
    TranslateModule,
  ],
  templateUrl: './prime-numbers-10-k.component.html',
  styleUrl: './prime-numbers-10-k.component.scss',
  standalone: true,
})
export class PrimeNumbers10KComponent {

  //
  get numbers10k(): string {
    return PRIME_NUMBERS_10K.join(', ');

  }

}
