import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumer-verify',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consumer-verify.component.html',
})
export class ConsumerVerifyComponent {
  codeInput: string = '';
  verificationResult: any = null;

  verifyManual(): void {
    if (!this.codeInput) return;
    // TODO: call real API
    this.verificationResult = {
      code: this.codeInput,
      status: Math.random() > 0.4 ? 'Verified' : 'Unknown',
      product: 'Sample Product',
      farmer: 'Local Farm',
    };
  }

  clear(): void {
    this.codeInput = '';
    this.verificationResult = null;
  }
}
