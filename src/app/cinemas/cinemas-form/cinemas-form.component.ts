import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CinemaCreationDTO, CinemaDTO } from '../models/cinema';
import { MapComponent } from "../../shared/components/map/map.component";
import { Coordinate } from '../../shared/components/map/coordinate';

@Component({
  selector: 'app-cinemas-form',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MapComponent],
  templateUrl: './cinemas-form.component.html',
  styleUrl: './cinemas-form.component.css'
})
export class CinemasFormComponent implements OnInit {
  ngOnInit(): void {
    if (this.model !== undefined) {
      console.log('Cine', this.model);
      this.form.patchValue(this.model);
      this.initalCoordinates.push({ latitude: this.model.latitude, length: this.model.length});
    }
      
  }
  
  @Input()
  model?: CinemaDTO;

  @Output()
  formPost = new EventEmitter<CinemaCreationDTO>();

  initalCoordinates: Coordinate[] = [];

  #formBuilder = inject(FormBuilder);

  form = this.#formBuilder.group({
    name: ['', { validators: [Validators.required]}],
    latitude: new FormControl<number | null>(null),
    length: new FormControl<number | null>(null)
  });

  getErrorsNameField(): string {
    let name = this.form.controls.name;

    if (name.hasError('required'))
      return 'El campo es obligatorio';

    return '';
  }

  handleSelectedCoordinate(coordinate: Coordinate) {
    this.form.patchValue(coordinate);
  }

  saveChanges() {
    if (!this.form.valid)
      return;

    const cinema = this.form.value as CinemaCreationDTO;

    this.formPost.emit(cinema);
  }

}
