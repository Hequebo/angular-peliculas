import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActorCreationDTO, ActorDTO } from '../models/actor';
import moment from 'moment';
import { dateCantBeFuture } from '../../shared/functions/validations';
import { InputImgComponent } from "../../shared/components/input-img/input-img.component";

@Component({
  selector: 'app-actors-form',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, InputImgComponent],
  templateUrl: './actors-form.component.html',
  styleUrl: './actors-form.component.css'
})
export class ActorsFormComponent  implements OnInit{
  ngOnInit(): void {
    if (this.model !== undefined)
      this.form.patchValue(this.model);
  }
  #formBuilder = inject(FormBuilder);

  @Input()
  model?: ActorDTO;

  @Output()
  formPost = new EventEmitter<ActorCreationDTO>();

  form = this.#formBuilder.group({
    name: ['', { validators: [Validators.required] }],
    birthDate: new FormControl<Date | null>(null, {
      validators: [Validators.required, dateCantBeFuture()]
    }),
    photo: new FormControl<File | string | null>(null)
  });

  getErrorsNameField() {
    let field = this.form.controls.name;

    if (field.hasError('required'))
      return 'El campo es obligatorio';

    return '';
  }

  getErrorsFieldBirthDate() {
    let field = this.form.controls.birthDate;

    if (field.hasError('required'))
      return 'El campo es obligatorio';

    if (field.hasError('future'))
      return field.getError('future').message;

    return '';
  }

  handleSelectedFile(file: File) {
    this.form.controls.photo.setValue(file);
  }

  saveChanges() {
    if (!this.form.valid)
      return

    const actor = this.form.value as ActorCreationDTO;
    actor.birthDate = moment(actor.birthDate).toDate();

    if (typeof actor.photo === 'string') {
      actor.photo = undefined;
    }
    this.formPost.emit(actor);
  }
}
