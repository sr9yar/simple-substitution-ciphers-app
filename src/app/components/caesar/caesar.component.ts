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

  private cipher: Caesar = new Caesar();

  constructor() {
    this.cipher.encrypt();
  }
  /**
   * ciphertextString
   */
  get plaintextString(): string {
    return this.cipher.plaintextString;
  }

  /**
   * ciphertextString
   */
  get ciphertextString(): string {
    return this.cipher.ciphertextString;
  }

  encrypt() {
    this.cipher.encrypt()
  }

  decrypt() {
    this.cipher.decrypt()
  }
}
