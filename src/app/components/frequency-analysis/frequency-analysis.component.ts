import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { take, tap } from 'rxjs';
import { ALPHABET_FREQUENCY_ENGLISH, ALPHABET_FREQUENCY_RUSSIAN } from 'simple-substitution-ciphers';

type SingleBarItem = {
  name: string,
  value: number
};

type MultipleBarItem = {
  name: string,
  series: {
    name: string,
    value: number,
  }[],
};

type Language = 'en' | 'ru';

// https://swimlane.gitbook.io/ngx-charts/examples/bar-charts/vertical-bar-chart
@Component({
  selector: 'app-frequency-analysis',
  imports: [
    FormsModule,
    NgxChartsModule,
    TranslateModule,
  ],
  templateUrl: './frequency-analysis.component.html',
  styleUrl: './frequency-analysis.component.scss',
  standalone: true,
})
export class FrequencyAnalysisComponent implements OnInit {

  language: Language = 'ru';
  // key - ciphertext frequency
  ciphertextFrequencyMap: Map<string, number> = new Map();
  // ranked by freq
  ciphertextFrequencyMapRanked: Map<string, number> = new Map();

  ciphertext: string = '';

  @Input()
  get encryptedText(): string {
    return this.ciphertext;
  }
  set encryptedText(newValue: string) {
    this.ciphertext = newValue;
    this.setCiphertext();
  }

  @Input()
  get alphabetLanguage(): Language {
    return this.language;
  }
  set alphabetLanguage(newValue: Language) {
    this.language = newValue;
    this.setData();
  }

  @Input()
  sort: 'asc' | 'desc' | null = null;

  results: MultipleBarItem[] | SingleBarItem[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Letter';
  showYAxisLabel = true;
  // yAxisLabel = 'Frequency';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }

  title = 'Letter frequency in the English alphabet';

  labelLetter = 'Letter';

  labelFrequency = 'Frequency';

  labelCipherFrequency = 'Cipher frequency';

  labelNaturalFrequency = 'Natural frequency';

  labelLegend = 'Legend';

  // ranked map by frequency
  alphabetMapRanked: string[] = [];
  // in alphabetical order
  alphabetMapUnsorted: Map<string, number> = new Map();
  // can have sorting applied
  alphabetMap: Map<string, number> = new Map();
  // suggested decryption alphabet: encrypted letter -> decrypted letter
  decryptionMap: Map<string, string> = new Map();

  decryptionSuggestion: string = '';

  constructor(
    private readonly translate: TranslateService,
  ) {

    this.translate.onLangChange.subscribe(() => {
      this.updateTranslations();
    });

    this.setData();
  }

  /**
   * 
   */
  ngOnInit(): void {
    this.updateTranslations();
  }

  /**
   * 
   */
  updateTranslations() {
    let translationSlug = 'frequency-analysis.title-en';
    if (this.alphabetLanguage === 'ru') {
      translationSlug = 'frequency-analysis.title-ru';
    }
    if (this.hasSecondDataset) {
      translationSlug = 'frequency-analysis.title-comparison';
    }
    this.translate.get(translationSlug)
      .pipe(tap((v: string) => this.title = v))
      .pipe(take(1))
      .subscribe();
    this.translate.get('frequency-analysis.letter')
      .pipe(tap((v: string) => this.labelLetter = v))
      .pipe(take(1))
      .subscribe();
    this.translate.get('frequency-analysis.frequency')
      .pipe(tap((v: string) => this.labelFrequency = v))
      .pipe(take(1))
      .subscribe();
    this.translate.get('frequency-analysis.cipher-frequency')
      .pipe(tap((v: string) => this.labelCipherFrequency = v))
      .pipe(tap((v: string) => this.setCiphertext()))
      .pipe(take(1))
      .subscribe();
    this.translate.get('frequency-analysis.natural-frequency')
      .pipe(tap((v: string) => this.labelNaturalFrequency = v))
      .pipe(tap((v: string) => this.setCiphertext()))
      .pipe(take(1))
      .subscribe();
    this.translate.get('frequency-analysis.legend')
      .pipe(tap((v: string) => this.labelLegend = v))
      .pipe(tap((v: string) => this.setCiphertext()))
      .pipe(take(1))
      .subscribe();
  }

  /**
   * set alphabet
   */
  setAlphabet() {
    switch (this.language) {
      case 'ru':
        this.alphabetMap = ALPHABET_FREQUENCY_RUSSIAN;
        this.alphabetMapUnsorted = ALPHABET_FREQUENCY_RUSSIAN;
        this.translate.get('frequency-analysis.title-ru')
          .pipe(tap((v: string) => this.title = v))
          .pipe(take(1))
          .subscribe();
        break;
      case 'en':
        this.alphabetMap = ALPHABET_FREQUENCY_ENGLISH;
        this.alphabetMapUnsorted = ALPHABET_FREQUENCY_ENGLISH;
        this.translate.get('frequency-analysis.title-en')
          .pipe(tap((v: string) => this.title = v))
          .pipe(take(1))
          .subscribe();
        break;
      default:
        this.alphabetMap = ALPHABET_FREQUENCY_ENGLISH;
        this.alphabetMapUnsorted = ALPHABET_FREQUENCY_ENGLISH;
        this.translate.get('frequency-analysis.title-en')
          .pipe(tap((v: string) => this.title = v))
          .pipe(take(1))
          .subscribe();

    }

    // Rank by frequency
    const sorted: [string, number][] =
      Array
        .from(this.alphabetMap)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1]);


    if (this.sort) {
      // Alphabet map
      this.alphabetMap = new Map(sorted);
    }

    this.alphabetMapRanked = sorted.map((item) => item[0]);

    this.setColors();
  }

  /**
   * set data
   */
  setData() {
    this.setAlphabet();

    // sort 
    if (this.sort) {
      if (this.alphabetMap.size) {
        // Alphabet map
        const sortedAlphabet: [string, number][] =
          Array
            .from(this.alphabetMap)
            .sort((a: [string, number], b: [string, number]) => b[1] - a[1]);

        this.alphabetMap = new Map(sortedAlphabet);
      }
    }

    const data: SingleBarItem[] = [];
    this.alphabetMap
      .forEach((value: number, key: string) => {
        data.push({
          name: key,
          value,
        });
      });
    Object.assign(this, { results: data });

    if (this.ciphertext) {
      this.setCiphertext();
    }
  }

  /**
   * Process ciphpertext
   */
  setCiphertext() {
    this.ciphertextFrequencyMap.clear();

    if (!this.ciphertext) {
      return;
    }
    // all encrypted letters
    let totalCount = 0;
    this.ciphertext.split('').forEach((letter: string) => {
      // if alphabet has not lettter than it's not enrypted 
      if (!this.alphabetMap.has(letter)) {
        return;
      }
      let letterCount: number = this.ciphertextFrequencyMap.get(letter) ?? 0;
      letterCount++;
      totalCount++;
      this.ciphertextFrequencyMap.set(letter, letterCount);
    });

    // calulate freq in percent`
    for (const [key, value] of this.ciphertextFrequencyMap) {
      const newValue: number = (value / totalCount) * 100;
      this.ciphertextFrequencyMap.set(key, newValue);
    }

    // sort
    if (this.ciphertextFrequencyMap.size) {
      // Cipher frequency map
      const sorted: [string, number][] =
        Array
          .from(this.ciphertextFrequencyMap)
          .sort((a: [string, number], b: [string, number]) => b[1] - a[1]);

      this.ciphertextFrequencyMapRanked = new Map(sorted);
    }


    // prepare data 
    const data: MultipleBarItem[] = [];

    let i: number = 0;
    this.ciphertextFrequencyMapRanked
      .forEach((value: number, key: string) => {
        const matchedByRank = this.alphabetMapRanked[i];
        data.push({
          name: `${key} → ${matchedByRank}`,
          series: [
            {
              name: `${this.labelCipherFrequency}`,
              value: value,
            },
            {
              name: `${this.labelNaturalFrequency}`,
              value: this.alphabetMap.get(matchedByRank) ?? 0,
            },
          ],
        });
        i++;
      });


    Object.assign(this, { results: data });
    this.setDecryptionSuggestion();
  }


  /**
   * 
   * Decryption suggestion
   */
  setDecryptionSuggestion() {
    this.decryptionMap.clear();

    const sortedFrequency: [string, number][] =
      Array
        .from(this.ciphertextFrequencyMapRanked);

    for (let i = 0; i < sortedFrequency.length; i++) {
      this.decryptionMap.set(sortedFrequency[i][0], this.alphabetMapRanked[i]);
    }

    const decryptionSuggestion: string = this.ciphertext.split('')
      .map((letter: string) => {
        if (this.decryptionMap.has(letter)) {
          return this.decryptionMap.get(letter);
        }
        return letter;
      })
      .join('');

    this.decryptionSuggestion = decryptionSuggestion;

    // this.generateFrequencyMappedText();

  }

  /**
   * set colors 
   */
  private setColors() {
    const colors: string[] = [];
    for (let i = 0; i < this.alphabetMap.size; i++) {
      colors.push(this.getRandomColor());
    }
    this.colorScheme = {
      domain: colors,
    }
  }

  /**
   * get random color
   * @returns 
   */
  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * If second dataset is provided
   * we display ordered comparison
   */
  get hasSecondDataset(): boolean {
    return !!this.ciphertext?.length;
  }


  /**
   * Generate freq mapped match text
   */
  generateFrequencyMappedText() {
    // Rank by frequency
    const sorted: [string, number][] =
      Array
        .from(this.alphabetMap)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1]);

    const alphabetMapRanked = sorted.map((item) => item[0]);

    let s = '';
    let f = '';
    const len = alphabetMapRanked.length;
    for (let i = 0; i < len; i++) {
      const l = alphabetMapRanked[i];

      f += `${l} ${(len - i) * 0.1479}%\n`;

      s += l ?? '';

      let j = len - i;
      while (j > 0) {
        s += l ?? '';
        j--;
      }
      s += '\n';
    }

    console.log(s);
    console.log('');
    console.log(f);

  }


  get xAxisLabel(): string {
    const xAxisLabel = this.labelLetter;
    const yAxisLabel = this.labelFrequency;
    if (this.hasSecondDataset) {
      return yAxisLabel;
    }
    return xAxisLabel;
  }

  get yAxisLabel(): string {
    const xAxisLabel = this.labelLetter;
    const yAxisLabel = this.labelFrequency;
    if (this.hasSecondDataset) {
      return xAxisLabel;
    }
    return yAxisLabel;
  }


}
