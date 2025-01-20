import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule ,FormGroup,FormBuilder} from '@angular/forms';
import { HeaderComponentComponent } from './Shared/header-component/header-component.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './demo/demo.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { RoomComponent } from './Pages/room-carousel/room.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AllRoomsComponent } from './Pages/Guest/all-rooms/all-rooms.component';
import { ReservationComponent } from './Pages/Guest/reservation/reservation.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyBookingsComponent } from './Pages/Guest/my-bookings/my-bookings.component';
import { ReceptionistDashboardComponent } from './Pages/receptionist/receptionist-dashboard/receptionist-dashboard.component';
import { AllReservationsComponent } from './Pages/receptionist/all-reservations/all-reservations.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCell } from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Material datepicker
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { UpdateStatusDialogBoxComponent } from './Pages/receptionist/update-status-dialog-box/update-status-dialog-box.component';
import { ManagerDashboardComponent } from './Pages/Manager/manager-dashboard/manager-dashboard.component';
import { ServiceRequestsComponent } from './Pages/Manager/service-requests/service-requests.component';
import { StaffSchedulesComponent } from './Pages/Manager/staff-schedules/staff-schedules.component';
import { AssignTaskDialogComponent } from './assign-task-dialog/assign-task-dialog.component';
import { HousekeepingDashboardComponent } from './Pages/HouseKeeping/housekeeping-dashboard/housekeeping-dashboard.component';
import { TasksAssignedComponent } from './Pages/HouseKeeping/tasks-assigned/tasks-assigned.component';
import { ScheduleFormComponent } from './Pages/Manager/schedule-form/schedule-form.component';
import { MarkAttendanceComponent } from './Pages/HouseKeeping/mark-attendance/mark-attendance.component';
import { ReviewDialogboxComponent } from './Pages/Guest/review-dialogbox/review-dialogbox.component';
import { PaymentGatewayDialogComponent } from './Pages/Guest/payment-gateway-dialog/payment-gateway-dialog.component';
import { ChartsComponent } from './Pages/Manager/charts/charts.component';
import { AddRoomsComponent } from './Pages/Manager/add-rooms/add-rooms.component';
import { UpdateRoomsComponent } from './Pages/Manager/update-rooms/update-rooms.component';
import { RoomsListComponent } from './Pages/Manager/rooms-list/rooms-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateAccountComponent } from './Pages/Manager/create-account/create-account.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    SigninComponent,
    DemoComponent,
    FooterComponent,
    RoomComponent,
    CarouselComponent,
    AllRoomsComponent,
    ReservationComponent,
    MyBookingsComponent,
    ReceptionistDashboardComponent,
    AllReservationsComponent,
    HomeComponent,
    UpdateStatusDialogBoxComponent,
    ManagerDashboardComponent,
    ServiceRequestsComponent,
    StaffSchedulesComponent,
    AssignTaskDialogComponent,
    HousekeepingDashboardComponent,
    TasksAssignedComponent,
    ScheduleFormComponent,
    MarkAttendanceComponent,
    ReviewDialogboxComponent,
    PaymentGatewayDialogComponent,
    ChartsComponent,
    AddRoomsComponent,
    UpdateRoomsComponent,
    RoomsListComponent,
    CreateAccountComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatChipsModule,
    MatTableModule,
    MatCell,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    BrowserAnimationsModule, // Required for animations
    ToastrModule.forRoot({
      timeOut: 3000, // Toast duration in milliseconds
      positionClass: 'toast-top-right', // Position
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true, // Ensures multiple interceptors can be used if needed
    }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
