import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Deplafonnement } from '../models/deplafonnement.model';

@Injectable({
  providedIn: 'root'
})
export class DeplafonnementService {

  constructor(private http: HttpClient) { }

  getAllDeplafonnement(): Observable<Deplafonnement[]> {
    return this.http.get<Deplafonnement[]>(`${environment.apiUrl}/deplafonnement/all`);
  }
}
