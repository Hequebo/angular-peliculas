import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CinemasService } from '../cinemas.service';
import { EntityIndexComponent } from "../../shared/components/entity-index/entity-index.component";

@Component({
  selector: 'app-cinemas-index',
  imports: [MatButtonModule, EntityIndexComponent],
  templateUrl: './cinemas-index.component.html',
  styleUrl: './cinemas-index.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: CinemasService
    }
  ]
})
export class CinemasIndexComponent {

}
