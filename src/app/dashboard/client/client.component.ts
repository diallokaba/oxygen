import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Utilisateur } from '../../models/utilisateur.model';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  user!: Utilisateur;
  solde: number = 200000;
  total: number = 1000000;
  actualyMonth!: string;
  show: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      //if(!this.authService.isConnected()) this.router.navigateByUrl('/login');
      this.transformMonthNumberToLetter();
  }

  transformMonthNumberToLetter(){
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    this.actualyMonth = months[new Date().getMonth()];
  }
}
