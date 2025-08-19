import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GenreIndexComponent } from './genres/genre-index/genre-index.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { ActorIndexComponent } from './actors/actor-index/actor-index.component';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { MoviesFilterComponent } from './movies/movies-filter/movies-filter.component';
import { CinemasIndexComponent } from './cinemas/cinemas-index/cinemas-index.component';
import { CreateCinemaComponent } from './cinemas/create-cinema/create-cinema.component';
import { EditCinemaComponent } from './cinemas/edit-cinema/edit-cinema.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { isAdminGuard } from './shared/guards/is-admin.guard';
import { LoginComponent } from './security/login/login.component';
import { SigninComponent } from './security/signin/signin.component';
import { UsersIndexComponent } from './security/users-index/users-index.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'generos', component: GenreIndexComponent, canActivate: [isAdminGuard] },
    { path: 'generos/crear', component: CreateGenreComponent, canActivate: [isAdminGuard] },
    { path: 'generos/editar/:id', component: EditGenreComponent, canActivate: [isAdminGuard] },
    { path: 'actores', component: ActorIndexComponent, canActivate: [isAdminGuard] },
    { path: 'actores/crear', component: CreateActorComponent, canActivate: [isAdminGuard] },
    { path: 'actores/editar/:id', component: EditActorComponent, canActivate: [isAdminGuard]},
    { path: 'cines', component: CinemasIndexComponent, canActivate: [isAdminGuard] },
    { path: 'cines/crear', component: CreateCinemaComponent, canActivate: [isAdminGuard] },
    { path: 'cines/editar/:id', component: EditCinemaComponent, canActivate: [isAdminGuard] },
    { path: 'peliculas/crear', component: CreateMovieComponent, canActivate: [isAdminGuard] },
    { path: 'peliculas/editar/:id', component: EditMovieComponent, canActivate: [isAdminGuard] },
    { path: 'peliculas/filtrar', component: MoviesFilterComponent },
    { path: 'pelicula/:id', component: MovieDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: SigninComponent },
    { path: 'usuarios', component: UsersIndexComponent, canActivate: [isAdminGuard] },
    { path: '**', redirectTo: '' }
];
