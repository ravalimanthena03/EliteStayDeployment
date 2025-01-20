import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private toastr:ToastrService) {
    this.userForm = this.fb.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', [Validators.required, Validators.minLength(6)]],
      Role: ['Guest', [Validators.required]],
      IsActive: [true],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = {
            ...this.userForm.value,
        PasswordHash: this.hashPassword(this.userForm.value.PasswordHash), // If hashing is needed
      };

      // POST the form data to your backend API
      this.http.post('https://localhost:7171/api/Auth/signup', formData).subscribe({
        next: (response) =>this.toastr.success('User Created Successfully!', 'Success'),
        error: (error) => this.toastr.error('Error adding user.', 'Error'),
      });
    }
  }

  private hashPassword(password: string): string {
    // Return hashed password if needed (use bcrypt on backend for security)
    return password;
  }
}
