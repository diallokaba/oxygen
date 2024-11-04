import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Utilisateur } from '../../models/utilisateur.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ICompte } from '../../models/compte.model';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  user: Utilisateur = {};
  compte: ICompte = {};
  total: number = 1000000;
  actualyMonth!: string;
  show: boolean = false;

  typePiece: string = '';
  photoPiece1: File | null = null;
  photoPiece2: File | null = null;

  constructor(private authService: AuthService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
      if(!this.authService.isConnected()) this.router.navigateByUrl('/login');
      this.user = this.authService.getConnectedUser();
      this.getCompte();
      this.transformMonthNumberToLetter();
  }

  transformMonthNumberToLetter(){
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    this.actualyMonth = months[new Date().getMonth()];
  }

  deplafonnement(){
    console.log("deplafonnement");
  }

  onFileSelected(event: Event, fileType: string) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if (fileType === 'photoPiece1') {
        this.photoPiece1 = target.files[0];
      } else if (fileType === 'photoPiece2') {
        this.photoPiece2 = target.files[0];
      }
    }
  }

  submitDeplafonnement() {
    if (!this.typePiece || (this.typePiece === 'CIN' && (!this.photoPiece1 || !this.photoPiece2)) || (this.typePiece === 'PASSEPORT' && !this.photoPiece1)) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    const formData = new FormData();
    formData.append('typePiece', this.typePiece);
    if (this.photoPiece1) formData.append('photoPiece1', this.photoPiece1);
    if (this.typePiece === 'CIN' && this.photoPiece2) formData.append('photoPiece2', this.photoPiece2);

    this.clientService.saveDemandeDeplafonnement(formData).subscribe({
      next: (response) => {
        console.log(response);
        alert("Demande de déplafonnement envoyée avec succès.");
      },
      error: (error) => {
        console.log(error);
        console.error("Erreur lors de la demande de déplafonnement:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }

  getCompte(){
    this.authService.getCompteByConnectedUser().subscribe({
      next: (compte) => {
        console.log(compte);
        this.compte = compte;
      },
      error: (error) => {
        console.error("Erreur lors de la demande de déplafonnement:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }
}
