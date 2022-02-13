import { Component, OnInit } from '@angular/core';
import Form from '../types/feedback-init-form';

@Component({
  selector: 'app-feedback-init-form',
  templateUrl: './feedback-init-form.component.html',
  styleUrls: ['./feedback-init-form.component.css']
})
export class FeedbackInitFormComponent implements OnInit {

  constructor() { }

  feedbackForm: Form = new Form();
  showPhoneNumber: boolean = false;
  error: string = '';

  togglePasswordView(): void {
    this.showPhoneNumber = !this.showPhoneNumber;
  }

  getLink(): void {
    const isNotANumber = parseInt(this.feedbackForm.phoneNumber);
    if (!isNotANumber) {
      this.error = 'Input a valid phone number (9999999999)'
      return;
    }
    console.log('getLink');
  }

  copyToClipboard(): void {
    console.log('copyToClipboard');
  }

  setPhoneNumber(event: Event): void {
    this.feedbackForm.phoneNumber = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
  }

}
