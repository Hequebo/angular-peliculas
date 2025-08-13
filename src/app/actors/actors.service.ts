import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorAutoCompleteDTO, ActorCreationDTO, ActorDTO } from './models/actor';
import { PaginationDTO } from '../shared/models/paginationDTO';
import { Observable } from 'rxjs';
import { buildQueryParams } from '../shared/functions/build-query-params';
import { ICRUDService } from '../shared/interfaces/icrud-service';

@Injectable({
  providedIn: 'root'
})
export class ActorsService implements ICRUDService<ActorDTO, ActorCreationDTO> {

  constructor() { }
  #http = inject(HttpClient);
  #urlBase = environment.apiURL + '/actores';

  public getPaginated(pagination: PaginationDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.#http.get<ActorDTO[]>(this.#urlBase, { params: queryParams, observe: 'response'});
  }

  public getById(id: number): Observable<ActorDTO> {
    return this.#http.get<ActorDTO>(`${this.#urlBase}/${id}`);
  }

  public getByName(name: string): Observable<ActorAutoCompleteDTO[]> {
    return this.#http.get<ActorAutoCompleteDTO[]>(`${this.#urlBase}/${name}`);
  }

  public create(actor: ActorCreationDTO) {
    const formData = this.#buildFormData(actor);
    return this.#http.post(this.#urlBase, formData);
  }

  public update(id: number, actor: ActorCreationDTO) {
    const formData = this.#buildFormData(actor);
    return this.#http.put(`${this.#urlBase}/${id}`, formData);
  }

  public delete(id: number) {
    return this.#http.delete(`${this.#urlBase}/${id}`);
  }

  #buildFormData(actor: ActorCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);
    formData.append('birthDate', actor.birthDate.toISOString().split('T')[0]);

    if (actor.photo)
      formData.append('photo', actor.photo);

    return formData;
  }
}
