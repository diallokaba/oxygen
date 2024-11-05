import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Utilisateur } from '../../models/utilisateur.model';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ICompte } from '../../models/compte.model';
import { INotification } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, RouterOutlet, FormsModule, ReactiveFormsModule, DatePipe],
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

  notifications: INotification[] = [];
  notificationCount = 0;
  isNotificationOpen = false;

  transfertForm!: FormGroup;
  phoneNumberExists: boolean | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private clientService: ClientService, private notificationService: NotificationService) {
    this.transfertForm = this.fb.group({
      receiverPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      montant: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
    });
    this.onPhoneNumberChange();
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

      this.notificationService.notificationCount$.subscribe(
        count => this.notificationCount = count
      );
  }

  onPhoneNumberChange() {
    this.transfertForm.get('receiverPhoneNumber')?.valueChanges
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

  submitTransfert() {
    if (this.transfertForm.valid && this.phoneNumberExists) {
      const { receiverPhoneNumber, montant } = this.transfertForm.value;
      this.clientService.faireTransfert({ receiverPhoneNumber, montant })
        .subscribe(response => {
          alert("Transfet effectué avec succès");
          this.transfertForm.reset();
        });
    } else {
      alert("Formulaire invalide ou numéro de téléphone incorrect.");
    }
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
        this.compte = compte;
      },
      error: (error) => {
        console.error("Erreur lors de la demande de déplafonnement:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }

  logout(){
    localStorage.removeItem("utilisateur");
    this.router.navigateByUrl('/login');
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
}
