import { Component, inject } from '@angular/core';
import { ActorsFormComponent } from "../actors-form/actors-form.component";
import { ActorsService } from '../actors.service';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CreateEntityComponent } from "../../shared/components/create-entity/create-entity.component";

@Component({
  selector: 'app-create-actor',
  imports: [CreateEntityComponent],
  templateUrl: './create-actor.component.html',
  styleUrl: './create-actor.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: ActorsService
    }
  ]
})
export class CreateActorComponent {
  actorsForm = ActorsFormComponent
}
