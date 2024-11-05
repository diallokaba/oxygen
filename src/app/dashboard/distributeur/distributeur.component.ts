import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { INotification } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';
import { ICompte } from '../../models/compte.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DistributeurService } from '../../services/distributeur.service';

@Component({
  selector: 'app-distributeur',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, RouterOutlet, DatePipe, ReactiveFormsModule],
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

  depotForm!: FormGroup;
  retraitForm!: FormGroup;
  phoneNumberExists: boolean | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private notificationService: NotificationService, private distributeurService: DistributeurService) {
    this.depotForm = this.fb.group({
      receiverPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      montant: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
    });

    this.retraitForm = this.fb.group({
      senderPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      montant: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
    });
   }

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

      this.onPhoneNumberChange();
  }

  onPhoneNumberChange() {
    this.depotForm.get('receiverPhoneNumber')?.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(phoneNumber => {
        if (phoneNumber && phoneNumber.length === 9) {
          this.authService.checkPhoneNumber(phoneNumber).subscribe(
            response => {
              this.phoneNumberExists = true;
            },
            error => {
              if (error.status === 404) {
                this.phoneNumberExists = false;
              }
            }
          );
        } else {
          this.phoneNumberExists = null;
        }
      });
  }


  submitDepot() {
    if (this.depotForm.valid && this.phoneNumberExists) {
      const { receiverPhoneNumber, montant } = this.depotForm.value;
      this.distributeurService.faireDepot({ receiverPhoneNumber, montant })
        .subscribe(response => {
          alert("Dépôt effectué avec succès");
          this.depotForm.reset();
        });
    } else {
      alert("Formulaire invalide ou numéro de téléphone incorrect.");
    }
  }

  submitRetrait() {
    if (this.retraitForm.valid) {
      const { senderPhoneNumber, montant } = this.retraitForm.value;
      this.distributeurService.faireRetrait({ senderPhoneNumber, montant })
        .subscribe(response => {
          alert("Retrait effectué avec succès");
          this.retraitForm.reset();
        });
    } else {
      alert("Formulaire invalide");
    }
  }

  transformMonthNumberToLetter(){
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    this.actualyMonth = months[new Date().getMonth()];
  }

  goToDemandeDeplafonnement(){
    this.router.navigateByUrl('/distributeur/demande-deplafonnement');
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

  logout(){
    localStorage.removeItem("utilisateur");
    this.router.navigateByUrl('/login');
  }
}
