import { Component, inject } from '@angular/core';
import { MovieCreationDTO } from '../models/movies';
import { MoviesFormComponent } from "../movies-form/movies-form.component";
import { MultiSelectorDTO } from '../../shared/components/multi-selector/multi-selector-model';
import { ActorAutoCompleteDTO } from '../../actors/models/actor';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { getErrors } from '../../shared/functions/get-errors';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-create-movie',
  imports: [MoviesFormComponent, ShowErrorsComponent, LoadingComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent {
  #moviesService = inject(MoviesService);
  #router = inject(Router);

  selectedGenres: MultiSelectorDTO[] = [];
  noSelectedGenres: MultiSelectorDTO[] = [];
  selectedCinemas: MultiSelectorDTO[] = [];
  noSelectedCinemas: MultiSelectorDTO[] = [];
  selectedActors: ActorAutoCompleteDTO[] = [];
  errors: string[] = [];

  constructor() {
    this.#moviesService.createGet().subscribe(model => {
      this.noSelectedGenres = model.genres.map(genre =>
        <MultiSelectorDTO>{ key: genre.id, value: genre.name }
      );
      this.noSelectedCinemas = model.cinemas.map(cinema =>
        <MultiSelectorDTO>{ key: cinema.id, value: cinema.name }
      );
    });
  }

  saveChanges(movie: MovieCreationDTO) {
    this.#moviesService.create(movie).subscribe({
      next: movie => {
        console.log(movie);
        this.#router.navigate(['/']);
      },
      error: err => {
        const errors = getErrors(err);
        this.errors = errors;
      }
    })
  }
}
