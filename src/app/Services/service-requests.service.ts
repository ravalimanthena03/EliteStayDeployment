import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestsService {

  constructor(private http: HttpClient) {}

  fetchServiceRequests(): Observable<any[]> {
    return this.http.get<any[]>(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/ServiceRequest/GetAllServiceRequests`);
  }
  updateServiceRequest(request: any): Observable<any> {
    return this.http.put(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/ServiceRequest/GetAllServiceRequests/assign`,request);
  }

  getStaffSchedules():Observable<any>{
    return this.http.get('https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/StaffSchedule/GetAllStaffSchedules');
  }
  getScheduleById(scheduleId: string): Observable<any> {
    return this.http.get<any>(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/StaffSchedule/${scheduleId}`);
  }
  getScheduleByStaffId(staffId:string):Observable<any>{
     return this.http.get<any>(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/StaffSchedule/by-staff/${staffId}`);
  }
  // assignTask(schedule: any) {
  //   return this.http.put(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/TaskAssignment/Create`, schedule);
  // }
  getAvailableStaff(shiftStartTime: string, shiftEndTime: string) {
    const apiUrl = `https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/StaffSchedule/GetAvailableStaff?shiftStartTime=${new Date(shiftStartTime)}&shiftEndTime=${new Date(shiftEndTime)}`;
    return this.http.get<any[]>(apiUrl);
  }
  //
  createStaffSchedule(schedule: any): Observable<string> {
    return this.http.post(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/StaffSchedule/create`, schedule, { responseType: 'text' });
  }
  //
  updateStaffSchedule(schedule: any): Observable<string> {
    return this.http.put(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/StaffSchedule/update`, schedule, { responseType: 'text' });
  }
  //
  getStaffOfHousekeeping(){
    return this.http.get('https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Auth/getUsersByRole?role=Housekeeping');
  }
   getAssignedTasks(email: string): Observable<any[]> {
    return this.http.get<any[]>(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/ServiceRequest/getTasksForLoggedInUser?email=${email}`);
  }

  completeTask(taskId: string): Observable<any> {
    return this.http.put(`https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/ServiceRequest/complete/${taskId}`, {});
  }

   // Method to assign a task
   assignTask(assignment: any): Observable<string> {
    const apiUrl = 'https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/ServiceRequest/assign';
    return this.http.put(apiUrl, assignment,{responseType:'text'});
  }
}
