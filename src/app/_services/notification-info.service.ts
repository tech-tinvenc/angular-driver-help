import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Notifications } from '@/_models';

@Injectable({ providedIn: 'root' })
export class NotificationInfoService {
  constructor(private http: HttpClient) { }


  getAll(id: String) {
    return this.http.post<Notifications>(`${config.apiUrl}/notifications`,{userId: id});
  }
}
