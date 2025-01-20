import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Pages/signin/signin.component';
import { RoomComponent } from './Pages/room-carousel/room.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AllRoomsComponent } from './Pages/Guest/all-rooms/all-rooms.component';
import { ReservationComponent } from './Pages/Guest/reservation/reservation.component';
import { MyBookingsComponent } from './Pages/Guest/my-bookings/my-bookings.component';
import { ReceptionistDashboardComponent } from './Pages/receptionist/receptionist-dashboard/receptionist-dashboard.component';
import { AllReservationsComponent } from './Pages/receptionist/all-reservations/all-reservations.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { ManagerDashboardComponent } from './Pages/Manager/manager-dashboard/manager-dashboard.component';
import { ServiceRequestsComponent } from './Pages/Manager/service-requests/service-requests.component';
import { StaffSchedulesComponent } from './Pages/Manager/staff-schedules/staff-schedules.component';
import { HousekeepingDashboardComponent } from './Pages/HouseKeeping/housekeeping-dashboard/housekeeping-dashboard.component';
import { TasksAssignedComponent } from './Pages/HouseKeeping/tasks-assigned/tasks-assigned.component';
import { ScheduleFormComponent } from './Pages/Manager/schedule-form/schedule-form.component';
import { MarkAttendanceComponent } from './Pages/HouseKeeping/mark-attendance/mark-attendance.component';
import { ChartsComponent } from './Pages/Manager/charts/charts.component';
import { AddRoomsComponent } from './Pages/Manager/add-rooms/add-rooms.component';
import { RoomsListComponent } from './Pages/Manager/rooms-list/rooms-list.component';
import { CreateAccountComponent } from './Pages/Manager/create-account/create-account.component';
import { UpdateRoomsComponent } from './Pages/Manager/update-rooms/update-rooms.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard], data: { roles: ['Guest','Receptionist','Housekeeping','Admin', 'Manager'] }},
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard], data: { roles: ['Guest','Receptionist','Housekeeping','Admin', 'Manager'] }},
  { path: 'rooms', component: RoomComponent , canActivate: [AuthGuard], data: { roles: ['Guest','Receptionist','Housekeeping','Admin', 'Manager'] }},
  { path: 'all-rooms', component:AllRoomsComponent , canActivate: [AuthGuard], data: { roles: ['Guest','Receptionist','Housekeeping','Admin', 'Manager'] }},
  { path: 'reservation', component: ReservationComponent , canActivate: [AuthGuard], data: { roles: ['Guest','Receptionist','Manager'] }},
  { path: 'user-bookings', component: MyBookingsComponent , canActivate: [AuthGuard], data: { roles: ['Guest'] }},
  { path: 'manager', component: ManagerDashboardComponent , canActivate: [AuthGuard], data: { roles: ['Admin', 'Manager'] }},
  { path: 'receptionist', component: ReceptionistDashboardComponent, canActivate: [AuthGuard], data: { roles: ['Receptionist'] } },
  { path: 'service-requests', component: ServiceRequestsComponent , canActivate: [AuthGuard], data: { roles: ['Admin', 'Manager'] }},
  { path: 'staff-schedules', component: StaffSchedulesComponent , canActivate: [AuthGuard], data: { roles: ['Receptionist','Admin', 'Manager'] }},
  { path: 'housekeeping', component: HousekeepingDashboardComponent , canActivate: [AuthGuard], data: { roles: ['Housekeeping'] }},
  { path: 'tasks-assigned', component: TasksAssignedComponent },
  { path: 'schedules', component: ScheduleFormComponent , canActivate: [AuthGuard], data: { roles: ['Admin', 'Manager'] }},
  { path: 'schedules/create', component: ScheduleFormComponent , canActivate: [AuthGuard], data: { roles: ['Admin', 'Manager'] }},
  { path: 'schedules/edit/:id', component: ScheduleFormComponent , canActivate: [AuthGuard], data: { roles: ['Housekeeping','Admin', 'Manager'] }},
  { path: 'mark-attendance', component: MarkAttendanceComponent , canActivate: [AuthGuard], data: { roles: ['Housekeeping'] }},
  { path: 'add-rooms', component: AddRoomsComponent , canActivate: [AuthGuard], data: { roles: ['Admin', 'Manager'] }},
  { path: 'rooms-list', component: RoomsListComponent },
  { path: 'update-room/:id', component: UpdateRoomsComponent , canActivate: [AuthGuard], data: { roles: ['Receptionist','Admin', 'Manager'] } },
  { path: 'charts', component: ChartsComponent , canActivate: [AuthGuard], data: { roles: ['Admin', 'Manager'] } },
  { path: 'create-account', component: CreateAccountComponent , canActivate: [AuthGuard], data: { roles: ['Admin', 'Manager'] } },
  {path:'receptionist',
    children: [
      { path: '', component: AllReservationsComponent },
      { path: 'all-reservations', component: AllReservationsComponent , canActivate: [AuthGuard], data: { roles: ['Receptionist','Admin', 'Manager'] }},
    ],
  },
  {
    path:'demo',component:DemoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
