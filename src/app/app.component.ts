import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'simple-substitution-ciphers-app';
}
