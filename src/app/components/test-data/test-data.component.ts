import { Component } from '@angular/core';
import {
  ALPHABET_FREQUENCY_MATCH_ENGLISH,
  ALPHABET_FREQUENCY_MATCH_RUSSIAN,
  CAESAR_DECRYPT_TEST,
  FREQUENCY_TEST_WITH_MISMATCH_RUSSIAN,
  FREQUENCY_TEST_RUSSIAN,
  RANDOM_TEXT,
} from '../../constants';
import {
  ALPHABET_ENGLISH,
  ALPHABET_RUSSIAN,
} from 'simple-substitution-ciphers';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-test-data',
  imports: [
    TranslateModule,
  ],
  templateUrl: './test-data.component.html',
  styleUrl: './test-data.component.scss',
  standalone: true,
})
export class TestDataComponent {
  testData = {
    CAESAR_DECRYPT_TEST,
    FREQUENCY_TEST_WITH_MISMATCH_RUSSIAN,
    FREQUENCY_TEST_RUSSIAN,
    RANDOM_TEXT,
    ALPHABET_FREQUENCY_MATCH_ENGLISH,
    ALPHABET_FREQUENCY_MATCH_RUSSIAN,
    ALPHABET_RUSSIAN,
    ALPHABET_ENGLISH,
  };
}
