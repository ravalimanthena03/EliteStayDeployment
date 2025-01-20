import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IRoom {
  id: string;
  roomType: string;
  price: number;
  maxPersons:number;
  bedType: string;
  view: string;
  status: string;
  availability: boolean;
  amenities: string[];
  imagePath: string;
}
@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private apiUrl = 'https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Room'; 
  constructor(private http: HttpClient) {}

  // Method to fetch room data from the backend
  getRoomsUnique(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.apiUrl}/uniqueByType`);
  }
  getAllRooms():Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.apiUrl}`)
  }
  getRoomById(roomId:string):Observable<any>{
    return this.http.get<any>(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Room/${roomId}`);
  }
  addRoom(room: any): Observable<any> {
    return this.http.post(this.apiUrl, room);
  }
  updateRoom(room: any): Observable<string> {
    return this.http.put(`${this.apiUrl}/${room.id}`, room, { responseType: 'text'});
  }
}
