import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenreCreationDTO, GenreDTO } from '../models/genre';
import { GenresService } from '../genres.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { Router } from '@angular/router';
import { getErrors } from '../../shared/functions/get-errors';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { EditEntityComponent } from "../../shared/components/edit-entity/edit-entity.component";

@Component({
  selector: 'app-edit-genre',
  imports: [EditEntityComponent],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: GenresService
    }
  ]
})
export class EditGenreComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  genresForm = GenreFormComponent;
}
