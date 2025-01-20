import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../../Services/rooms.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-rooms',
  templateUrl: './update-rooms.component.html',
  styleUrl: './update-rooms.component.scss'
})
export class UpdateRoomsComponent implements OnInit{
  updateRoomForm: FormGroup;
  roomId: string|null;
  roomTypes: string[] = ['Single Room', 'Deluxe Room', 'Suite Room', 'Family Room', 'Premium Room', 'Presidential Suite'];
  bedTypes: string[] = ['Single', 'Double', 'King', 'Two Queens'];
  views: string[] = ['Courtyard', 'City View', 'Ocean View', 'Park View', 'Mountain View', 'Panoramic View'];
  availableAmenities = ['Wi-Fi', 'TV', 'Mini Bar', 'Air Conditioning', 'Private Balcony', 'Microwave'];
  availableServices = ['Breakfast Delivery', 'Cleaning Service', 'In-room Dining', 'Plumbing Services', 'Towel Replacement'];
 
  selectedAmenities: string[] = [];
  selectedServices: string[] = [];

  amenityInput = '';
  serviceInput = '';
  constructor(
    private fb: FormBuilder,
    private roomService: RoomsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService
  ) { 
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.updateRoomForm = this.fb.group({
      roomType: [''],
      maxPersons: [''],
      price: [''],
      bedType: [''],
      view: [''],
      status: [''],
      availability: [true],
      amenities: [[]],
      services: [[]],
      imagePath: ['']
    });
  }
  
  
  ngOnInit(): void {
    if (this.roomId) {
      // Fetch room details by ID and populate the form
      this.roomService.getRoomById(this.roomId).subscribe((room) => {
        this.updateRoomForm.patchValue({
          roomType: room.roomType,
          maxPersons: room.maxPersons,
          price: room.price,
          bedType: room.bedType,
          view: room.view,
          status: room.status,
          availability: room.availability,
          amenities: room.amenities,
          services: room.services,
          imagePath: room.imagePath
        });
      });
    }
  }
   
  
  getRoomDetails(roomId: string): void {
    this.roomService.getRoomById(roomId).subscribe(
      room => {
        this.updateRoomForm.patchValue(room);
      },
      error => {
        console.error('Failed to fetch room details', error);
      }
    );
  }

  updateRoom(): void {
    if (this.updateRoomForm.invalid) {
      return;
    }

    const updatedRoom = {
      ...this.updateRoomForm.value,
      id: this.roomId
    };
    console.log(updatedRoom);
    this.roomService.updateRoom(updatedRoom).subscribe(
      () => {
        this.router.navigate(['/rooms-list']);  
        this.toastr.success('Room Updated successfully!', 'Success');
      },
      error => {
        console.error('Failed to update room', error);
      }
    );
  }
  addAmenity(amenity?: string): void {
    if (amenity && !this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities.push(amenity);
    } else if (this.amenityInput.trim() && !this.selectedAmenities.includes(this.amenityInput.trim())) {
      this.selectedAmenities.push(this.amenityInput.trim());
    }
    this.amenityInput = '';
  }

  removeAmenity(amenity: string): void {
    this.selectedAmenities = this.selectedAmenities.filter((item) => item !== amenity);
  }

  addService(service?: string): void {
    if (service && !this.selectedServices.includes(service)) {
      this.selectedServices.push(service);
    } else if (this.serviceInput.trim() && !this.selectedServices.includes(this.serviceInput.trim())) {
      this.selectedServices.push(this.serviceInput.trim());
    }
    this.serviceInput = '';
  }

  removeService(service: string): void {
    this.selectedServices = this.selectedServices.filter((item) => item !== service);
  }

}
