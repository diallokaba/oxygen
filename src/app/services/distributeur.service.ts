import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributeurService {

  constructor(private http: HttpClient) { }

  faireDepot(data: { receiverPhoneNumber: string, montant: number }): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('utilisateur')!).token}`
    });
    return this.http.post(`${environment.apiUrl}/operations/depot`, data, {headers: headers});
  }

  faireRetrait(data: { senderPhoneNumber: string, montant: number }): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('utilisateur')!).token}`
    });
    return this.http.post(`${environment.apiUrl}/operations/retrait`, data, {headers: headers});
  }
}
