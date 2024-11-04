import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { INotification } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';
import { ICompte } from '../../models/compte.model';

@Component({
  selector: 'app-distributeur',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, RouterOutlet, DatePipe],
  templateUrl: './distributeur.component.html',
  styleUrl: './distributeur.component.scss'
})
export class DistributeurComponent implements OnInit{
  user: Utilisateur = {};
  compte: ICompte = {};
  total: number = 1000000;
  actualyMonth!: string;
  show: boolean = false;

  notifications: INotification[] = [];
  notificationCount = 0;

  isNotificationOpen = false;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
      if(!this.authService.isConnected()) this.router.navigateByUrl('/login');
      this.user = this.authService.getConnectedUser();
      this.getCompte();
      this.transformMonthNumberToLetter();
  
      this.notificationService.registerUser(this.user._id);

      this.notificationService.notifications$.subscribe(
        notifications => this.notifications = notifications
      );

      console.log(this.notifications);

      this.notificationService.notificationCount$.subscribe(
        count => this.notificationCount = count
      );

      console.log(this.notificationCount);
  }

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  markAsRead(notificationId?: string) {
    this.notificationService.markAsRead(notificationId).subscribe(updatedNotification => {
      this.notifications = this.notifications.map(notif =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      );
      this.notificationCount = this.notifications.filter(n => n.read === false).length;
    });
  }

  transformMonthNumberToLetter(){
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    this.actualyMonth = months[new Date().getMonth()];
  }

  deplafonnement(){
    console.log("deplafonnement");
  }

  getCompte(){
    this.authService.getCompteByConnectedUser().subscribe({
      next: (compte) => {
        this.compte = compte;
      },
      error: (error) => {
        console.error("Erreur lors de la demande de déplafonnement:", error);
      }
    });
  }
}
