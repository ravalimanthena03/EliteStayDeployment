import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'https://hotelmanagementsysmongodb20250119194116.azurewebsites.net/api/Feedback'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: any): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
}
