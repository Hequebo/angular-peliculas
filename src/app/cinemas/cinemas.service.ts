import { inject, Injectable } from '@angular/core';
import { ICRUDService } from '../shared/interfaces/icrud-service';
import { CinemaCreationDTO, CinemaDTO } from './models/cinema';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/paginationDTO';
import { environment } from '../../environments/environment.development';
import { buildQueryParams } from '../shared/functions/build-query-params';

@Injectable({
  providedIn: 'root'
})
export class CinemasService implements ICRUDService<CinemaDTO, CinemaCreationDTO> {

  constructor() { }
  #http = inject(HttpClient);
  #urlBase = environment.apiURL + '/cines';

  getPaginated(pagination: PaginationDTO): Observable<HttpResponse<CinemaDTO[]>> {
    let queryParams = buildQueryParams(pagination)
    return this.#http.get<CinemaDTO[]>(this.#urlBase, { params: queryParams, observe: 'response' });
  }

  getById(id: number): Observable<CinemaDTO> {
    return this.#http.get<CinemaDTO>(`${this.#urlBase}/${id}`);
  }

  create(entity: CinemaCreationDTO): Observable<any> {
    return this.#http.post(this.#urlBase, entity);
  }

  update(id: number, entity: CinemaCreationDTO): Observable<any> {
    return this.#http.put(`${this.#urlBase}/${id}`, entity);
  }

  delete(id: number): Observable<any> {
    return this.#http.delete(`${this.#urlBase}/${id}`);
  }
}
