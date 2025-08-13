import { Component } from '@angular/core';
import { CinemaCreationDTO } from '../models/cinema';
import { CinemasFormComponent } from "../cinemas-form/cinemas-form.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CinemasService } from '../cinemas.service';
import { CreateEntityComponent } from "../../shared/components/create-entity/create-entity.component";

@Component({
  selector: 'app-create-cinema',
  imports: [CreateEntityComponent],
  templateUrl: './create-cinema.component.html',
  styleUrl: './create-cinema.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: CinemasService
    }
  ]
})
export class CreateCinemaComponent {
  cinemasForm = CinemasFormComponent
}
