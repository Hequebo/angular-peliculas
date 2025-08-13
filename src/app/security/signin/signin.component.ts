import { Component, inject } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { UserCredentialsDTO } from '../security';
import { getErrorsIdentity } from '../../shared/functions/get-errors';
import { AuthenticationFormComponent } from "../authentication-form/authentication-form.component";

@Component({
  selector: 'app-signin',
  imports: [AuthenticationFormComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  #securityService = inject(SecurityService);
  #router = inject(Router);

  errors: string[] = [];

  signIn(credentials: UserCredentialsDTO) {
    this.#securityService.signIn(credentials)
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
