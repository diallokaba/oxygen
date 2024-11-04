import { Component, OnInit } from '@angular/core';
import { DeplafonnementService } from '../../../services/deplafonnement.service';
import { IDeplafonnement } from '../../../models/deplafonnement.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demande-deplafonnement',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './demande-deplafonnement.component.html',
  styleUrl: './demande-deplafonnement.component.scss'
})
export class DemandeDeplafonnementComponent implements OnInit {

  deplafonnements: IDeplafonnement[] = [];

  constructor(private deplafonnementService: DeplafonnementService) { }

  ngOnInit(): void {
      this.all();
  }

  all(){
    this.deplafonnementService.getAllDeplafonnement().subscribe({
      next: (deplafonnements: IDeplafonnement[]) => {
        console.log(deplafonnements);  // afficher les déplafonnements dans la console
        this.deplafonnements = deplafonnements;
      },
      error: (error) => {
        console.error("Erreur lors de la demande de déplafonnement:", error);
      }
    });
  }

  valider(deplafonnementId?: string) {
    console.log(deplafonnementId)
    this.deplafonnementService.validerDeplafonnement(deplafonnementId).subscribe({
      next: (deplafonnement) => {
        console.log(deplafonnement);
        //update array deplafonements
        this.all();
        alert("Demande de déplafonnement validée avec sucees.");
      },
      error: (error) => {
        console.log(error);
        console.error("Erreur lors de la demande de déplafonnement:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }
}
