import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../../../Services/rooms.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrl: './add-rooms.component.scss'
})
export class AddRoomsComponent implements OnInit{

  roomForm!: FormGroup;
  roomTypes = ['Single Room', 'Deluxe Room', 'Suite Room', 'Family Room', 'Premium Room', 'Presidential Suite'];
  bedTypes = ['Single', 'Queen', 'King', 'Two Queens'];
  availableAmenities = ['Wi-Fi', 'TV', 'Mini Bar', 'Air Conditioning', 'Private Balcony', 'Microwave'];
  availableServices = ['Breakfast Delivery', 'Cleaning Service', 'In-room Dining', 'Plumbing Services', 'Towel Replacement'];
 
  selectedAmenities: string[] = [];
  selectedServices: string[] = [];

  amenityInput = '';
  serviceInput = '';

  constructor(private fb: FormBuilder, private roomService: RoomsService,private toastr:ToastrService) {}

 ngOnInit(): void {
    this.roomForm = this.fb.group({
      roomType: ['', Validators.required],
      maxPersons: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      bedType: ['', Validators.required],
      view: ['', Validators.required],
      status: ['Available', Validators.required],
      availability: [true],
    });
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

  onSubmit(): void {
    if (this.roomForm.valid) {
      const roomData = {
        ...this.roomForm.value,
        amenities: this.selectedAmenities,
        services: this.selectedServices,
        imagePath: `/assets/images/Rooms/${this.roomForm.value.roomType.replace(' ', '-').toLowerCase()}.jpg`,
      };

      this.roomService.addRoom(roomData).subscribe({
        next: () =>this.toastr.success('Room added successfully!', 'Success'),
        error: (err) =>this.toastr.error('Error adding room.', 'Error'),
      });
    }
  }
}
