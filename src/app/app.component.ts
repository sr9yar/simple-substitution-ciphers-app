import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { TranslateModule } from "@ngx-translate/core";

import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet,
    MatMenuModule,
    RouterModule,
    TranslateModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
  }

  title = 'Simple Substitution Ciphers App';

  switchLanguage(code: string): void {
    // 'ru-RU'
    this.translate.use(code.toLowerCase().slice(0, 2));
  }
}
