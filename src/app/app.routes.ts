import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FogotPasspordComponent } from './fogot-passpord/fogot-passpord.component';
import { EnterCodeComponent } from './enter-code/enter-code.component';
import { ClientComponent } from './dashboard/client/client.component';
import { DistributeurComponent } from './dashboard/distributeur/distributeur.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { MarchandComponent } from './dashboard/marchand/marchand.component';
import { AideComponent } from './aide/aide.component';
import { TransactionClientComponent } from './dashboard/client/transaction-client/transaction-client.component';
import { DistributeurClientComponent } from './dashboard/client/distributeur-client/distributeur-client.component';
import { DemandeDeplafonnementComponent } from './dashboard/distributeur/demande-deplafonnement/demande-deplafonnement.component';
import { TransactionDistributeurComponent } from './dashboard/distributeur/transaction-distributeur/transaction-distributeur.component';
import { ListClientComponent } from './dashboard/distributeur/list-client/list-client.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'client', component: ClientComponent, children: [
        { path: 'help', component: AideComponent },
        { path: 'transaction-client', component: TransactionClientComponent },
        { path: 'distributeur-client', component: DistributeurClientComponent },
        { path: '', redirectTo: 'transaction-client', pathMatch: 'full' }
  
    ] }, 
    { path: 'forgot-password', component: FogotPasspordComponent },
    { path: 'enter-code', component: EnterCodeComponent },
    { path: 'distributeur', component: DistributeurComponent, children:[
        { path: 'demande-deplafonnement', component: DemandeDeplafonnementComponent },
        { path: 'list-client', component: ListClientComponent },
        { path: 'help', component: AideComponent },
        { path: 'transaction-distributeur', component: TransactionDistributeurComponent },
        { path: '', redirectTo: 'transaction-distributeur', pathMatch: 'full' }
    ] },
    { path: 'admin', component: AdminComponent },
    { path: 'marchand', component: MarchandComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
