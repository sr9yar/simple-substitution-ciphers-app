import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  PRIME_NUMBERS,
} from '@sr9yar/public-key-cryptography';

@Component({
  selector: 'app-prime-numbers',
  imports: [
    TranslateModule,

  ],
  templateUrl: './prime-numbers.component.html',
  styleUrl: './prime-numbers.component.scss',
  standalone: true,

})
export class PrimeNumbersComponent {

  //
  get first1k(): string {
    return PRIME_NUMBERS.join(', ');
  };

}
