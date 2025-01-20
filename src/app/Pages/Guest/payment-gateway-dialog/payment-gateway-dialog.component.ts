import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-gateway-dialog',
  templateUrl: './payment-gateway-dialog.component.html',
  styleUrl: './payment-gateway-dialog.component.scss'
})
export class PaymentGatewayDialogComponent {

  cardNumber = '';
  expiryDate = '';
  cvv = '';
  isSubmitted = false;
  paymentSuccessful = false;
  isProcessing = false;

  constructor(
    public dialogRef: MatDialogRef<PaymentGatewayDialogComponent>,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  // Validation for card number
  isValidCardNumber(): boolean {
    return /^\d{16}$/.test(this.cardNumber);
  }

  // Validation for expiry date
  isValidExpiryDate(): boolean {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiryDate);
  }

  // Validation for CVV
  isValidCVV(): boolean {
    return /^\d{3}$/.test(this.cvv);
  }

  // Process payment
  processPayment(): void {
    this.isSubmitted = true;

    // Check if all fields are valid
    if (this.isValidCardNumber() && this.isValidExpiryDate() && this.isValidCVV()) {
      this.isProcessing = true;
      this.cdr.detectChanges(); // Force UI update to show the spinner

      // Simulate a 2-second payment delay
      setTimeout(() => {
        this.paymentSuccessful = true;
        this.isProcessing = false;
        this.cdr.detectChanges(); // Ensure UI reflects the updated state
      }, 2000);
    }
  }
 
  closeDialog(): void {
    this.dialogRef.close(this.paymentSuccessful);
  }
}