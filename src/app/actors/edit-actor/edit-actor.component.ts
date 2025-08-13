import { Component, Input, numberAttribute } from '@angular/core';
import { ActorsFormComponent } from "../actors-form/actors-form.component";
import { ActorsService } from '../actors.service';
import { EditEntityComponent } from "../../shared/components/edit-entity/edit-entity.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';

@Component({
  selector: 'app-edit-actor',
  imports: [EditEntityComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: ActorsService
    }
  ]
})
export class EditActorComponent {

  @Input({ transform: numberAttribute})
  id!: number;

  actorsForm = ActorsFormComponent;
}
