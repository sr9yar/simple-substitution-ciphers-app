import { Component } from '@angular/core';
import { Caesar } from 'simple-substitution-ciphers';

@Component({
  selector: 'app-caesar',
  imports: [],
  templateUrl: './caesar.component.html',
  styleUrl: './caesar.component.scss',
  standalone: true,
})
export class CaesarComponent {

  private caesar: Caesar = new Caesar();

  constructor() {
    this.caesar.encrypt();
  }
  /**
   * ciphertextString
   */
  get plaintextString(): string {
    return this.caesar.plaintextString;
  }

  /**
   * ciphertextString
   */
  get ciphertextString(): string {
    return this.caesar.ciphertextString;
  }

  encrypt() {
    this.caesar.encrypt()
  }

  decrypt() {
    this.caesar.decrypt()
  }
}
