import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../models/transaction.model';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<ITransaction[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('utilisateur')!).token}`
    });
    console.log(JSON.parse(localStorage.getItem('utilisateur')!).token);
    return this.http.get<ITransaction[]>(`${environment.apiUrl}/operations/transactions/all`, {headers:headers});
  }
}
