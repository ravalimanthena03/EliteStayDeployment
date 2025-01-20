import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface IReservation {
  id?:string;
  guestId:string,
  firstName: string;
  lastName: string;
  email: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  specialRequests?: string;
  status:boolean;
  roomDetails?: IRoom;
  showServices?:boolean;
}
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role:string;
}
export interface IRoom {
  id: string;
  roomType: string;
  price: number;
  maxPersons: number;
  bedType: string;
  view: string;
  status: string;
  availability: boolean;
  amenities: string[];
  imagePath: string;
  services:string[]
}
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Reservation';
  private roomApiUrl = 'https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Room';
  constructor(private http: HttpClient) {}

  createReservation(reservation: IReservation): Observable<any> {
    return this.http.post( `${this.apiUrl}/createReservation`, reservation);
  }

  getUserByMail(email: string): Observable<IUser> {
    const apiUrl = `https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Auth/getUserByEmail?email=${email}`;
    return this.http.get<IUser>(apiUrl);
  }

  getReservationsByMail(email: string): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/by/${email}`);
  }
  // Fetch room by ID
  getRoomById(roomId: string): Observable<IRoom> {
    return this.http.get<IRoom>(`${this.roomApiUrl}/${roomId}`);
  }

  getAllReservations() {
    return this.http.get<any[]>('https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Reservation');
  }
  
  updateReservationStatus(id: string, status: boolean): Observable<any> {
    return this.http.patch(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Reservation/${id}`, status);
  }
   getAllServices(roomId:string):Observable<string[]>{
      return this.http.get<string[]>(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Room/${roomId}/services`);
   }

   bookService(serviceRequest: any): Observable<any> {
    return this.http.post(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/ServiceRequest/create`, serviceRequest,{ responseType: 'text' });
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post<any>('https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Payment', payment);
  }
}
