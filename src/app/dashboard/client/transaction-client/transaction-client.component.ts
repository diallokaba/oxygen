import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-client',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './transaction-client.component.html',
  styleUrl: './transaction-client.component.scss'
})
export class TransactionClientComponent {
  total: number = 1000000;
}
