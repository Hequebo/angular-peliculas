import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentialsDTO } from '../security';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-authentication-form',
  imports: [
    ShowErrorsComponent,
    ReactiveFormsModule,
    //RouterLink,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.css'
})
export class AuthenticationFormComponent {
  #formBuilder = inject(FormBuilder);

  form = this.#formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email]}],
    password: ['', { validators: [Validators.required]}]
  });

  @Input({ required: true })
  title!: string;

  @Input()
  errors: string[] = [];

  @Output()
  formPost = new EventEmitter<UserCredentialsDTO>();

  getErrorsEmailField(): string {
    let field = this.form.controls.email;

    if (field.hasError('required'))
      return 'El campo Email es obligatorio';

    if(field.hasError('email'))
      return 'El email no es válido';

    return '';
  }

  getErrorsPasswordField(): string {
    let field = this.form.controls.password;

    if (field.hasError('required'))
      return 'El campo Password es obligatorio';

    return '';
  }

  saveChanges() {
    if (!this.form.valid)
      return;

    const credentials = this.form.value as UserCredentialsDTO;

    this.formPost.emit(credentials);
  }
}
