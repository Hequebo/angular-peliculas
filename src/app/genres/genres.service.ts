import { inject, Injectable } from '@angular/core';
import { GenreCreationDTO, GenreDTO } from './models/genre';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginationDTO } from '../shared/models/paginationDTO';
import { buildQueryParams } from '../shared/functions/build-query-params';
import { ICRUDService } from '../shared/interfaces/icrud-service';

@Injectable({
  providedIn: 'root'
})
export class GenresService implements ICRUDService<GenreDTO, GenreCreationDTO> {
  readonly #http = inject(HttpClient);
  #urlBase = environment.apiURL + '/genres';

  constructor() { }

  public getPaginated(pagination: PaginationDTO): Observable<HttpResponse<GenreDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.#http.get<GenreDTO[]>(this.#urlBase, { params: queryParams, observe: 'response' });
  }

  public getAll(): Observable<GenreDTO[]> {
    return this.#http.get<GenreDTO[]>(`${this.#urlBase}/todos`);
  }

  public getById(id: number): Observable<GenreDTO> {
    return this.#http.get<GenreDTO>(`${this.#urlBase}/${id}`);
  }

  public create(genre: GenreCreationDTO): Observable<any> {
    return this.#http.post(this.#urlBase, genre);
  }

  public update(id: number, genre: GenreCreationDTO): Observable<any> {
    return this.#http.put(`${this.#urlBase}/${id}`, genre);
  }

  public delete(id: number): Observable<any> {
    return this.#http.delete(`${this.#urlBase}/${id}`);
  }
}
