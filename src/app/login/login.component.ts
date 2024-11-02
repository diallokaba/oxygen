import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  credentials!: string;
  bloquer!: string;
  validation!: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      mdp: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get telephone() {
    return this.loginForm.get('telephone');
  }

  get mdp() {
    return this.loginForm.get('mdp');
  }

  login() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data).subscribe({
        next: (res: any) => {
          this.authService.setConnectedUser(res.data);
          this.redirectUserByHisRole(res.data.role);
        },
        error: (error) => {
          if(error.error.credentials) this.credentials = error.error.credentials;
          else if(error.error.bloquer) this.bloquer = error.error.bloquer;
          else if(error.error.validation) this.validation = error.error.validation;
          
        },
        complete: () => {
          console.log('Completed');
        }
      });
    }
  }

  private redirectUserByHisRole(role: string):void {
    switch (role) {
      case 'CLIENT':
        this.router.navigate(['/client']);
        break;
      case 'AGENT':
        this.router.navigate(['/distributeur']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case'MARCHAND':
        this.router.navigate(['/marchand']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}
