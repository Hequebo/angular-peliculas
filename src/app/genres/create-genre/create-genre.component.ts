import { Component } from '@angular/core';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenresService } from '../genres.service';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CreateEntityComponent } from "../../shared/components/create-entity/create-entity.component";

@Component({
  selector: 'app-create-genre',
  imports: [CreateEntityComponent],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css',
  providers:[
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: GenresService
    }
  ]
})
export class CreateGenreComponent {
  genresForm = GenreFormComponent;
}
