import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FogotPasspordComponent } from './fogot-passpord/fogot-passpord.component';
import { EnterCodeComponent } from './enter-code/enter-code.component';
import { ClientComponent } from './dashboard/client/client.component';
import { DistributeurComponent } from './dashboard/distributeur/distributeur.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { MarchandComponent } from './dashboard/marchand/marchand.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: FogotPasspordComponent },
    { path: 'enter-code', component: EnterCodeComponent },
    { path: 'dashbord-client', component: ClientComponent },
    { path: 'dashbord-distributeur', component: DistributeurComponent },
    { path: 'dashbord-admin', component: AdminComponent },
    { path: 'dashbord-marchand', component: MarchandComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
