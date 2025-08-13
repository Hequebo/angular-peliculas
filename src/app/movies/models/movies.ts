import { ActorAutoCompleteDTO } from "../../actors/models/actor";
import { CinemaDTO } from "../../cinemas/models/cinema";
import { GenreDTO } from "../../genres/models/genre";

export interface MovieDTO {
    id: number;
    title: string;
    releaseDate: Date;
    trailer: string;
    poster?: string;
    genres?: GenreDTO[];
    cinemas?: CinemaDTO[];
    actors?: ActorAutoCompleteDTO[];
    userVote: number;
    averageVote: number;
}

export interface MovieCreationDTO {
    title: string;
    releaseDate: Date;
    trailer: string;
    poster?: File;
    genresIds?: number[];
    cinemasIds?: number[];
    actors?: ActorAutoCompleteDTO[];
}

export interface MoviesPostGetDTO {
    genres: GenreDTO[];
    cinemas: CinemaDTO[];
}

export interface LandingPageDTO {
    inCinemas: MovieDTO[];
    nextReleases: MovieDTO[];
}

export interface MoviesPutGetDTO {
    movie: MovieDTO;
    selectedGenres: GenreDTO[];
    noSelectedGenres: GenreDTO[];
    selectedCinemas: CinemaDTO[];
    noSelectedCinemas: CinemaDTO[];
    actors: ActorAutoCompleteDTO[];
}