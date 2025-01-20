import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http:HttpClient) { }

  getAllReservations():Observable<any>{
   return this.http.get<any>('https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Reservation');
  }
  getFeedbacks():Observable<any>{
    return this.http.get<any>('https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Feedback');
  }
}
