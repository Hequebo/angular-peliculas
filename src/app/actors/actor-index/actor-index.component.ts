import { Component } from '@angular/core';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { ActorsService } from '../actors.service';
import { EntityIndexComponent } from "../../shared/components/entity-index/entity-index.component";

@Component({
  selector: 'app-actor-index',
  imports: [EntityIndexComponent],
  templateUrl: './actor-index.component.html',
  styleUrl: './actor-index.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: ActorsService
    }
  ]
})
export class ActorIndexComponent {
  
}
