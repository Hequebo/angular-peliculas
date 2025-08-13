import { Component } from '@angular/core';
import { EntityIndexComponent } from "../../shared/components/entity-index/entity-index.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-genre-index',
  imports: [EntityIndexComponent],
  templateUrl: './genre-index.component.html',
  styleUrl: './genre-index.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: GenresService
    }
  ]
})
export class GenreIndexComponent {

}
