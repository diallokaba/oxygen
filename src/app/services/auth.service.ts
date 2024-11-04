import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { IUtilisateur } from '../models/utilisateur.model';
import { Observable } from 'rxjs';
import { ICompte } from '../models/compte.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {
   }

  login(data: any): Observable<IUtilisateur> {
    return this.http.post(`${environment.apiUrl}/user/login`, data);
  }

  setConnectedUser(data: any){
    localStorage.setItem('utilisateur', JSON.stringify(data));
  }

  getConnectedUser(){
    return JSON.parse(localStorage.getItem('utilisateur')!);
  }

  logout(){
    localStorage.removeItem('utilisateur');
  }

  isConnected(){
    if(this.getConnectedUser()) return true;
    else return false;
  }

  redirectToLoginPage(){
    
  }

  getCompteByConnectedUser(): Observable<ICompte>{
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('utilisateur')!).token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`${environment.apiUrl}/compte/connected-user`, {headers:headers});
  }
}
