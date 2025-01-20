import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService,IRoom } from '../../../Services/rooms.service';
@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss'
})
export class RoomsListComponent  implements OnInit{
   rooms:IRoom[]=[];
   constructor(private roomService: RoomsService, private router: Router) { }
   ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getAllRooms().subscribe(
      (rooms) => {
        this.rooms = rooms;
      },
      (error) => {
        console.error('Failed to fetch rooms', error);
      }
    );
  }
  
  updateRoom(id: string): void {
    this.router.navigate([`/update-room/${id}`]);
  }
}
