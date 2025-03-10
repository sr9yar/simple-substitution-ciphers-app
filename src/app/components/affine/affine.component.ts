import { Component } from '@angular/core';
import { Affine } from 'simple-substitution-ciphers';

@Component({
  selector: 'app-affine',
  imports: [],
  templateUrl: './affine.component.html',
  styleUrl: './affine.component.scss',
  standalone: true,
})
export class AffineComponent {
  private cipher: Affine = new Affine();


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
