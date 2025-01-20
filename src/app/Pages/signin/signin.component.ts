import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  isLogin:boolean=true;
  formData = {
    username: '',
    email: '',
    passwordHash: '',
    role:'Guest',
    isActive:true
  };
  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService) {}
  // Toggle between login and signup
  toggleForm(event: Event): void {
    event.preventDefault();
    this.isLogin = !this.isLogin;
  }

  // Handle form submission
  onSubmit(form: any): void {
    if (this.isLogin) {
      // Login logic
      this.login();
    } else {
      // Signup logic
      this.signup();
    }
  }

   // Login method
   login(): void {
    const { email, passwordHash } = this.formData;
    this.authService.login(email, passwordHash).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email',email);
        localStorage.setItem('role',response.role);
        const role = response.role;
        this.toastr.success('Logged in successfully!', 'Success');
        if (role === 'Admin') this.router.navigate(['/admin']);
        else if (role === 'Manager') this.router.navigate(['/manager']);
        else if (role ==='Receptionist') this.router.navigate(['/receptionist']);
        else if (role ==='Housekeeping') this.router.navigate(['/housekeeping']);
        else if (role ==='Guest') this.router.navigate(['/home']);
        else if (role === 'Admin') this.router.navigate(['/manager']);
        else this.router.navigate(['/home']);
        this.authService.isLoggedInSubject.next(true);
        this.authService.roleSubject.next(role);
      },
      (error) => {
        this.toastr.error('Login failed.', 'Error');
        console.log(this.formData);
        alert('Invalid email or password. Please try again.');
      }
    );
  }

  signup(): void {
    console.log('Sending signup payload:', this.formData); // Debugging
    this.authService.signup(this.formData).subscribe(
      (response: any) => {
        console.log('Signup response:', response);
        this.toastr.success('Signed up successfully!', 'Success');
        this.isLogin = true; // Switch to login mode after successful signup
      },
      (error) => {
        this.toastr.error('Signup failed', 'Error');
        alert(error.error?.message || 'Signup failed. Please check your inputs and try again.');
      }
    );
  }
  
  
}
