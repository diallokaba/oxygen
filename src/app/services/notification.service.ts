import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { INotification } from '../models/notification.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private socket: Socket;
  private _notifications = new BehaviorSubject<INotification[]>([]);
  private _notificationCount = new BehaviorSubject<number>(0);

  notifications$ = this._notifications.asObservable();
  notificationCount$ = this._notificationCount.asObservable();

  constructor(private http: HttpClient) { 
    this.socket = io('http://localhost:3000');
    this.setupSocketListeners();
  }

  registerUser(userId?: string) {
    this.socket.emit('registerUser', userId);
    this.loadInitialNotifications();
  }

  private loadInitialNotifications() {
    //make headers
    let token = JSON.parse(localStorage.getItem('utilisateur')!).token;
    const headers = {
      'Authorization': 'Bearer ' + token
    }
    this.http.get<INotification[]>(`${environment.apiUrl}/notifications/all`, {headers: headers})
      .subscribe(notifications => {
        this._notifications.next(notifications);
        this._notificationCount.next(notifications.length);
      });
  }

  markAsRead(notificationId?: string): Observable<INotification> {
    return this.http.patch<INotification>(`${environment.apiUrl}/notifications/${notificationId}/read`,{});
  }

  private setupSocketListeners() {
    this.socket.on('nouvelleNotification', (data) => {
      const currentNotifications = this._notifications.value;
      this._notifications.next([...currentNotifications, data.notification]);
      this._notificationCount.next(data.nbNotifications);
    });
  }
}
