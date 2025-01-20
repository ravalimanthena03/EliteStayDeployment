import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ReservationService } from '../Services/reservation.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  email:string|null='';
  constructor(private authService: AuthService, private router: Router,private reservationService:ReservationService) {
   this.email=localStorage.getItem('email');
  }

  canActivate(route: any): boolean {
    const user = this.reservationService.getUserByMail(this.email||''); // Fetch current user
    const requiredRoles = route.data['roles'] as Array<string>; // Get roles from route data

    if (!user) {
      this.router.navigate(['/home']); // Redirect to login if not authenticated
      return false;
    }
    const role=localStorage.getItem('role')||'';
    if (requiredRoles && !requiredRoles.includes(role)) {
      this.router.navigate(['/unauthorized']); // Redirect if user lacks role
      return false;
    }

    return true; // Allow access if role matches
  }
}

