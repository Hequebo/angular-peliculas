import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthenticationResponseDTO, UserCredentialsDTO, UserDTO } from './security';
import { Observable, tap } from 'rxjs';
import { PaginationDTO } from '../shared/models/paginationDTO';
import { buildQueryParams } from '../shared/functions/build-query-params';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  #http = inject(HttpClient);
  #urlBase = environment.apiURL + '/usuarios';
  readonly #tokenKey = 'token';
  readonly #expirationKey = 'token-expiracion';

  getUsersPaginated(pagination: PaginationDTO): Observable<HttpResponse<UserDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.#http.get<UserDTO[]>(`${this.#urlBase}/ListadoUsuarios`, { params: queryParams, observe: 'response' });
  }

  asingAdmin(email: string) {
    return this.#http.post(`${this.#urlBase}/HacerAdmin`, { email });
  }

  removeAdmin(email: string) {
    return this.#http.post(`${this.#urlBase}/RemoverAdmin`, { email });
  }

  public signIn(userCredientials: UserCredentialsDTO): Observable<AuthenticationResponseDTO> {
    return this.#http.post<AuthenticationResponseDTO>(`${this.#urlBase}/registrar`, userCredientials)
    .pipe(
      tap(response => this.saveToken(response))
    );
  }

  public logIn(userCredientials: UserCredentialsDTO): Observable<AuthenticationResponseDTO> {
    return this.#http.post<AuthenticationResponseDTO>(`${this.#urlBase}/login`, userCredientials)
    .pipe(
      tap(response => this.saveToken(response))
    );
  }

  getJWTField(field: string): string {
    const token = localStorage.getItem(this.#tokenKey);
    
    if (!token)
      return '';

    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  saveToken(authenticationResponse: AuthenticationResponseDTO) {
    localStorage.setItem(this.#tokenKey, authenticationResponse.token);
    localStorage.setItem(this.#expirationKey, authenticationResponse.expiration.toString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.#tokenKey);
  }

  isLogged(): boolean {
    const token = localStorage.getItem(this.#tokenKey);

    if (!token)
      return false;

    const expiration = localStorage.getItem(this.#expirationKey)!;
    const expiracionDate = new Date(expiration);

    if (expiracionDate <= new Date()) {
      this.logOut();
      return false;
    }

    return true;
  }

  logOut() {
    localStorage.removeItem(this.#tokenKey);
    localStorage.removeItem(this.#expirationKey);
  }

  getRole(): string {
    const isAdmin = this.getJWTField('isadmin');
    if (isAdmin) {
      return 'admin';
    }
    return '';
  }
}
