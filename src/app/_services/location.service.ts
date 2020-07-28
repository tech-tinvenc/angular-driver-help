import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';


import { User } from '@/_models';


@Injectable({ providedIn: 'root' })
export class LocationService {
private currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();
  this.latitude = "0.0";
  this.longitude ="0.0";

   }
  latitude: string;
  longitude: string;

  getPosition(user: User){
    console.log("This item is called in loop")

    return from(this.populateLatLong()).pipe(map(pos=>
    {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    console.log(JSON.stringify(pos));
    return this.http.post<any>(`${config.apiUrl}/location/gather`, { userid:this.currentUserSubject.value.id, latitude:pos.lat, longitude: pos.lng }).subscribe()
    }));

  }

  populateLatLong(): Promise<any>
    {
      return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(resp => {
            this.latitude = resp.coords.latitude+"";
            this.longitude = resp.coords.longitude+"";
            resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          },
          err => {
            reject(err);
          });
      });

    }

}
