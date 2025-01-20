import { Component, Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceRequestsService } from '../Services/service-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  message: string; 
}
@Component({
  selector: 'app-assign-task-dialog',
  templateUrl: './assign-task-dialog.component.html',
  styleUrl: './assign-task-dialog.component.scss'
})
export class AssignTaskDialogComponent implements OnInit {
  selectedStaff: any;
  availableStaff: any[] = [];
  isLoading = true;

  constructor(
    private ServiceRequestsService:ServiceRequestsService,
    public dialogRef: MatDialogRef<AssignTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.fetchAvailableStaff();
  }
  
  fetchAvailableStaff(): void {
    const apiUrl = `https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/TaskAssignment/GetAvailableStaff?shiftStartTime=${this.data.requestTime}&shiftEndTime=${this.data.deliveryTime || ''}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.availableStaff = data;
        console.log(this.availableStaff);
        this.isLoading = false;
      },
      (error) => {
        this.snackBar.open('Failed to load available staff.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }

  assignTask(): void {
    const assignment = {
      serviceRequestId: this.data.serviceRequestId,
      assignedTo: this.selectedStaff.staffId,
      assignedTime: new Date().toISOString(),
    };

    // Call the assignTask method from ServiceRequestService
    this.ServiceRequestsService.assignTask(assignment).subscribe(
      (response: string) => {
        this.snackBar.open('Task assigned successfully.', 'Close', { duration: 3000 });
        this.dialogRef.close(true); // Close dialog with success
      },
      (error) => {
        console.error('Error Response:', error);
        let errorMessage = 'Failed to assign task. Please try again later.';
        
        if (error.error) {
          errorMessage = error.error;
        } else if (error.status === 400) {
          errorMessage = error.error || 'Invalid data sent. Please check your input.';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error. Please contact support.';
        }

        this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
      }
    );
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
