import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../../../models/transaction.model';
import { IUtilisateur } from '../../../models/utilisateur.model';
import { TransactionService } from '../../../services/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-distributeur',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './transaction-distributeur.component.html',
  styleUrl: './transaction-distributeur.component.scss'
})
export class TransactionDistributeurComponent implements OnInit {

  transactions: ITransaction[] = [];
  user!: IUtilisateur;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.allTransactions();
  }

  allTransactions() {
    this.transactionService.getAllTransactions().subscribe({

      next: (data: any) => {
        console.log(data);
        this.transactions = data.transactions;
      },
      error: (error) => {
        console.error("Erreur lors de la demande de déplafonnement:", error);
      }
    });
  }

}
