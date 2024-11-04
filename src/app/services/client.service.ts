import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  saveDemandeDeplafonnement(data: FormData): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('utilisateur')!).token}`
    });
    return this.http.post(`${environment.apiUrl}/deplafonnement/create`, data, {headers:headers});
  }
}
