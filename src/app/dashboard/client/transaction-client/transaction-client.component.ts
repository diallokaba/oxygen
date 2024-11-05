import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IUtilisateur } from '../../../models/utilisateur.model';
import { ITransaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-client',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction-client.component.html',
  styleUrl: './transaction-client.component.scss'
})
export class TransactionClientComponent implements OnInit {
  total: number = 1000000;

  transactions: ITransaction[] = [];
  user!: IUtilisateur;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.allTransactions();
  }

  allTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data: any) => {
        console.log(data);  // afficher les transactions dans la console
        this.transactions = data.transactions;
      },
      error: (error) => {
        console.error("Erreur lors de la demande de déplafonnement:", error);
      }
    });
  }
}
