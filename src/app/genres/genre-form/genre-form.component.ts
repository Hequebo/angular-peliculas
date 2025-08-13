import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstCapitalLetter } from '../../shared/functions/validations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GenreCreationDTO, GenreDTO } from '../models/genre';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-genre-form',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, RouterLink],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.css'
})
export class GenreFormComponent implements OnInit{
  ngOnInit(): void {
    if (this.model !== undefined)
      this.form.patchValue(this.model);
  }
  @Input() 
  model?: GenreDTO;

  @Output()
  formPost = new EventEmitter<GenreCreationDTO>();

  #formBuilder = inject(FormBuilder);

  form = this.#formBuilder.group({
    name: ['', { validators: [Validators.required, firstCapitalLetter(), Validators.maxLength(15)]}]
  });

  getErrorsNameField(): string {
    let name = this.form.controls.name;

    if (name.hasError('required'))
      return 'El Nombre campo es obligatiorio';

    if (name.hasError('maxlength'))
      return `El campo Nombre no puede tener más de ${ name.getError('maxlength').requiredLength } caracteres`;

    if (name.hasError('firstCapitalLetter')) {
      return name.getError('firstCapitalLetter').message;
    }


    return '';
  }

  saveChanges() {
    if (!this.form.valid) 
      return;

    const genre = this.form.value as GenreCreationDTO;
    this.formPost.emit(genre);
    
  }
}
