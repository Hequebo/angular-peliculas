import { Component, inject } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { UserCredentialsDTO } from '../security';
import { getErrorsIdentity } from '../../shared/functions/get-errors';
import { AuthenticationFormComponent } from "../authentication-form/authentication-form.component";

@Component({
  selector: 'app-login',
  imports: [AuthenticationFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  #securityService = inject(SecurityService);
  #router = inject(Router);

  errors: string[] = [];

  logIn(credentials: UserCredentialsDTO) {
    this.#securityService.logIn(credentials)
    .subscribe({
      next: () => {
        this.#router.navigate(['/']);
      },
      error: err => {
        const errors = getErrorsIdentity(err);
        this.errors = errors;
      }
    });
  }
}
