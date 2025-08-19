import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { GenresService } from "./genres.service";
import { firstValueFrom } from "rxjs";

describe('GenresService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
    });

    it('Should correctly create the service', () => {
        const genresService = TestBed.inject(GenresService);
        expect(genresService).toBeTruthy();
    });

    it('Should execute a GET request to get all the genres', () => {
        // Preparar
        const httpTesting = TestBed.inject(HttpTestingController);
        const genresService = TestBed.inject(GenresService);
        const getAll$ = genresService.getAll();

        // Probar
        firstValueFrom(getAll$);

        // Verificar
        const request = httpTesting.expectOne(req => req.url.endsWith('api/genres/todos'),
            'Gets all the genres');
        expect(request.request.method).toBe('GET');
    });
});