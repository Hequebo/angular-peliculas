import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MovieCreationDTO, MovieDTO } from '../models/movies';
import { MoviesFormComponent } from "../movies-form/movies-form.component";
import { MultiSelectorDTO } from '../../shared/components/multi-selector/multi-selector-model';
import { ActorAutoCompleteDTO } from '../../actors/models/actor';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { getErrors } from '../../shared/functions/get-errors';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-edit-movies',
  imports: [MoviesFormComponent, ShowErrorsComponent, LoadingComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent implements  OnInit {
  ngOnInit(): void {
    this.#moviesService.updateGet(this.id).subscribe(model => {
      this.movie = model.movie;
      this.selectedGenres = model.selectedGenres.map(genre => 
        <MultiSelectorDTO>{ key: genre.id, value: genre.name}
      );
      this.noSelectedGenres = model.noSelectedGenres.map(genre =>
        <MultiSelectorDTO>{ key: genre.id, value: genre. name }
      );
      this.selectedCinemas = model.selectedCinemas.map(cinema =>
        <MultiSelectorDTO>{ key: cinema.id, value: cinema.name }
      );
      this.noSelectedCinemas = model.noSelectedCinemas.map(cinema =>
        <MultiSelectorDTO>{ key: cinema.id, value: cinema.name }
      );
      this.selectedActors = model.actors;
    })
  }
  @Input({ transform: numberAttribute })
  id!: number;

  #moviesService = inject(MoviesService);
  #router = inject(Router)

  movie!: MovieDTO
  selectedGenres!: MultiSelectorDTO[];
  noSelectedGenres!: MultiSelectorDTO[];
  selectedCinemas!: MultiSelectorDTO[];
  noSelectedCinemas!: MultiSelectorDTO[];
  selectedActors!: ActorAutoCompleteDTO[];
  errors: string[] = [];

  saveChanges(movie: MovieCreationDTO) {
    this.#moviesService.update(this.id, movie).subscribe({
      next: () =>{
        this.#router.navigate(['/'])
      },
      error: err => {
        const errors = getErrors(err);
        this.errors = errors;
      }
    });
  }
}
