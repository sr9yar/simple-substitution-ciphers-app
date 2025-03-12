import { Component } from '@angular/core';
import {
  ALPHABET_FREQUENCY_MATCH_ENGLISH,
  ALPHABET_FREQUENCY_MATCH_RUSSIAN,
  CAESAR_DECRYPT_TEST,
  RANDOM_TEXT
} from '../../constants';

@Component({
  selector: 'app-test-data',
  imports: [],
  templateUrl: './test-data.component.html',
  styleUrl: './test-data.component.scss',
  standalone: true,
})
export class TestDataComponent {
  testData = {
    CAESAR_DECRYPT_TEST,
    RANDOM_TEXT,
    ALPHABET_FREQUENCY_MATCH_ENGLISH,
    ALPHABET_FREQUENCY_MATCH_RUSSIAN,
  };
}
