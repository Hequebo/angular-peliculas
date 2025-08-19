import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor() { }

  #http = inject(HttpClient);
  #urlBase = environment.apiURL + '/rating';

  public rate(movieId: number, score: number) {
    return this.#http.post(this.#urlBase, { movieId, score });
  }
}
