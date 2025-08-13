import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../shared/components/input-img/input-img.component';
import { MovieCreationDTO, MovieDTO } from '../models/movies';
import moment from 'moment';
import { MultiSelectorDTO } from '../../shared/components/multi-selector/multi-selector-model';
import { MultiSelectorComponent } from "../../shared/components/multi-selector/multi-selector.component";
import { AutoCompleteActorsComponent } from "../../actors/auto-complete-actors/auto-complete-actors.component";
import { ActorAutoCompleteDTO } from '../../actors/models/actor';

@Component({
  selector: 'app-movies-form',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule, InputImgComponent, MultiSelectorComponent, AutoCompleteActorsComponent],
  templateUrl: './movies-form.component.html',
  styleUrl: './movies-form.component.css'
})
export class MoviesFormComponent implements OnInit{
  ngOnInit(): void {
    if (this.model !== undefined)
      this.form.patchValue(this.model);
  }

  @Input({ required: true })
  noSelectedGenres!: MultiSelectorDTO[];

  @Input({ required: true })
  selectedGenres!: MultiSelectorDTO[];

  @Input({ required: true })
  noSelectedCinemas!: MultiSelectorDTO[];

  @Input({ required: true })
  selectedCinemas!: MultiSelectorDTO[];

  @Input({ required: true })
  selectedActors!: ActorAutoCompleteDTO[];

  @Input()
  model?: MovieDTO;

  @Output()
  postForm = new EventEmitter<MovieCreationDTO>();

  #formBuilder = inject(FormBuilder);

  form = this.#formBuilder.group({
    title: ['', { validators: [Validators.required] }],
    releaseDate: new FormControl<Date | null>(null, { validators: [Validators.required] }),
    trailer: '',
    poster: new FormControl<File | string | null>(null)
  });

  selectedFile(file: File) {
    this.form.controls.poster.setValue(file);
  }

  saveChanges() {
    if (this.form.invalid) {
      return;
    }
      

    const movie = this.form.value as MovieCreationDTO;
    movie.releaseDate = moment(movie.releaseDate).toDate();

    const genresIds = this.selectedGenres.map(val => val.key);
    movie.genresIds = genresIds;
    
    const cinemasIds = this.selectedCinemas.map(val => val.key);
    movie.cinemasIds = cinemasIds;

    movie.actors = this.selectedActors;

    this.postForm.emit(movie);
  }

  getErrorsTitleField(): string {
    let field = this.form.controls.title;
    if (field.hasError('required'))
      return 'El campo título es obligatorio';
    
    return '';
  }

  getErrorsReleaseDateField(): string {
    let field = this.form.controls.releaseDate;
    if (field.hasError('required'))
      return 'El campo fecha de lanzamiento es obligatorio';
    
    return '';
  }

  handleSelectedFile(file: File) {
    this.form.controls.poster.setValue(file);
  }
}
