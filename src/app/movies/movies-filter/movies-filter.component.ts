import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MoviesListComponent } from "../movies-list/movies-list.component";
import { MovieFilter } from './movie-filter';
import { Location } from '@angular/common';
import { debounceTime, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GenreDTO } from '../../genres/models/genre';
import { MovieDTO } from '../models/movies';
import { GenresService } from '../../genres/genres.service';
import { MoviesService } from '../movies.service';
import { PaginationDTO } from '../../shared/models/paginationDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies-filter',
  imports: [
    MatButtonModule,
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatCheckboxModule, 
    MoviesListComponent,
    MatPaginatorModule
  ],
  templateUrl: './movies-filter.component.html',
  styleUrl: './movies-filter.component.css'
})
export class MoviesFilterComponent implements OnInit {
  ngOnInit(): void {
    this.#genresService.getAll().subscribe(genres => {
      this.genres = genres;
      this.readValuesURL();
      this.searchMovies(this.form.value as MovieFilter);
      this.form.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(values => {
        this.searchMovies(values as MovieFilter);
        this.writeSearchParametersInURL(values as MovieFilter);
      });
    });
    

    
  }

  #genresService = inject(GenresService);
  #moviesService = inject(MoviesService);
  #formBuilder = inject(FormBuilder);
  #location = inject(Location);
  #activatedRoute = inject(ActivatedRoute);

  form = this.#formBuilder.group({
    title: '',
    genreId: 0,
    nextReleases: false,
    inCinemas: false
  });

  genres!: GenreDTO[];
  movies!: MovieDTO[];
  pagination: PaginationDTO = {
    page: 1,
    recordsPerPage: 10
  };
  totalRecordsAmount!: number;

  searchMovies(filter: MovieFilter) {
    filter.page = this.pagination.page;
    filter.recordsPerPage = this.pagination.recordsPerPage;

    this.#moviesService.filter(filter).subscribe(response => {
      this.movies = response.body as MovieDTO[];
      const header = response.headers.get('cantidad-total-registros') as string;
      this.totalRecordsAmount = parseInt(header, 10)
    })
  }

  writeSearchParametersInURL(filter: MovieFilter) {
    let queryStrings = [];

    if (filter.title)
      queryStrings.push(`title=${encodeURIComponent(filter.title)}`);
    if (filter.genreId)
      queryStrings.push(`genreId=${filter.genreId}`);
    if (filter.nextReleases) 
      queryStrings.push(`nextReleases=${filter.nextReleases}`);
    if (filter.inCinemas) 
      queryStrings.push(`inCinemas=${filter.inCinemas}`);

    this.#location.replaceState('peliculas/filtrar', queryStrings.join('&'));
    
  }

  readValuesURL() {
    this.#activatedRoute.queryParams.subscribe((params: any) => {
      let filter: any = {};

      if (params.title)
        filter.title = params.title;
      if (params.genreId)
        filter.genreId = Number(params.genreId);
      if (params.nextReleases)
        filter.nextReleases = params.nextReleases;
      if (params.inCinemas)
        filter.inCinemas = params.inCinemas;

      this.form.patchValue(filter);
    });
  }

  clearSearch() {
    this.form.patchValue({
      title: '',
      genreId: 0,
      nextReleases: false,
      inCinemas: false
    });
  }

  updatePagination(data: PageEvent) {
    this.pagination = {
      page: data.pageIndex + 1,
      recordsPerPage: data.pageSize
    };

    this.searchMovies(this.form.value as MovieFilter);
  }
}
