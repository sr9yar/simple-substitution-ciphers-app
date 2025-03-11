import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
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
  ],
  templateUrl: './frequency-analysis.component.html',
  styleUrl: './frequency-analysis.component.scss',
  standalone: true,
})
export class FrequencyAnalysisComponent {

  language: Language = 'ru';

  @Input()
  get alphabetLanguage(): Language {
    return this.language;
  }
  set alphabetLanguage(newValue: Language) {
    this.language = newValue;
    this.setData();
  }

  single: any[] = [];
  multi: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Letter';
  showYAxisLabel = true;
  yAxisLabel = 'Frequency';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }

  title = 'Letter frequency in the English alphabet';

  alphabet: Map<string, number> = new Map();

  constructor() {
    this.setData();
  }

  onSelect(event: any) {
    console.log(event);
  }

  setAlphabet() {
    switch (this.language) {
      case 'ru':
        this.alphabet = ALPHABET_FREQUENCY_RUSSIAN;
        this.title = 'Letter frequency in the Russian alphabet';
        break;
      case 'en':
        this.alphabet = ALPHABET_FREQUENCY_ENGLISH;
        this.title = 'Letter frequency in the English alphabet';
        break;
      default:
        this.alphabet = ALPHABET_FREQUENCY_ENGLISH;
        this.title = 'Letter frequency in the English alphabet';

    }
    this.setColors();
  }

  setData() {
    this.setAlphabet();
    const data: SingleBarItem[] = [];
    this.alphabet
      .forEach((value: number, key: string) => {
        data.push({
          name: key,
          value,
        });
      });
    Object.assign(this, { single: data });
  }

  setColors() {
    const colors: string[] = [];
    for (let i = 0; i < this.alphabet.size; i++) {
      colors.push(this.getRandomColor());
    }
    this.colorScheme = {
      domain: colors,
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
