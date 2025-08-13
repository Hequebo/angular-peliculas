import { Component, inject, OnInit } from '@angular/core';
import { MoviesListComponent } from "../movies/movies-list/movies-list.component";
import { MoviesService } from '../movies/movies.service';
import { getErrors } from '../shared/functions/get-errors';
import { MovieDTO } from '../movies/models/movies';
import { AuthorizedComponent } from "../security/authorized/authorized.component";

@Component({
  selector: 'app-landing-page',
  imports: [MoviesListComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor() {
    this.loadMovies();
  }

  #moviesService = inject(MoviesService);

  inCinemasMovies!: MovieDTO[];
  nextReleasesMovies!: MovieDTO[];
  errors: string[] = [];

  movieDeleted() {
    this.loadMovies();
  }

  loadMovies() {
    this.#moviesService.getLandingPage().subscribe(response => {
      this.inCinemasMovies = response.inCinemas;
      this.nextReleasesMovies = response.nextReleases;
    });
  }

}
