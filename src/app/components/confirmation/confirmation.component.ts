import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  @Input() isVisible: boolean = true;
  @Input() date: Date | string = new Date();
  @Input() name: string = "";
  @Input() address: string = "";
  @Input() email: string = "";
  @Input() totalAmount: number = 0;
}
