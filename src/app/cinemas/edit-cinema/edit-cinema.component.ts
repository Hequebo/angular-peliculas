import { Component, Input, numberAttribute } from '@angular/core';
import { CinemasFormComponent } from '../cinemas-form/cinemas-form.component';
import { CinemaCreationDTO, CinemaDTO } from '../models/cinema';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CinemasService } from '../cinemas.service';
import { EditEntityComponent } from "../../shared/components/edit-entity/edit-entity.component";

@Component({
  selector: 'app-edit-cinema',
  imports: [EditEntityComponent],
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: CinemasService
    }
  ]
})
export class EditCinemaComponent {

  @Input({ transform: numberAttribute})
  id!: number;

  cinemasForm = CinemasFormComponent

}
