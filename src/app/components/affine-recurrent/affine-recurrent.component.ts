import { Component } from '@angular/core';
import { AffineRecurrent } from 'simple-substitution-ciphers';

@Component({
  selector: 'app-affine-recurrent',
  imports: [],
  templateUrl: './affine-recurrent.component.html',
  styleUrl: './affine-recurrent.component.scss',
  standalone: true,
})
export class AffineRecurrentComponent {
  private cipher: AffineRecurrent = new AffineRecurrent();


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
