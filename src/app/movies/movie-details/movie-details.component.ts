import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { MovieDTO } from '../models/movies';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordinate } from '../../shared/components/map/coordinate';
import { MapComponent } from "../../shared/components/map/map.component";
import { RatingService } from '../../rating/rating.service';
import { SecurityService } from '../../security/security.service';
import Swal from 'sweetalert2';
import { RatingComponent } from "../../shared/components/rating/rating.component";

@Component({
  selector: 'app-movie-details',
  imports: [LoadingComponent, MatChipsModule, RouterLink, MapComponent, RatingComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  ngOnInit(): void {
    this.#moviesService.getById(this.id).subscribe(movie => {
      movie.releaseDate = new Date(movie.releaseDate);
      this.movie = movie;
      this.trailerURL = this.generateURLYoutubeEmbed(movie.trailer);

      this.coordinates = movie.cinemas!.map(cinema => {
        return <Coordinate>{ latitude: cinema.latitude, length: cinema.length, text: cinema.name }
      })
    });
  }

  @Input({ transform: numberAttribute})
  id!: number;

  trailerURL!: SafeResourceUrl;
  movie!: MovieDTO;
  coordinates: Coordinate[] = [];

  #moviesService = inject(MoviesService);
  #sanitizer = inject(DomSanitizer);
  #ratingsService = inject(RatingService);
  #securityService = inject(SecurityService);

  generateURLYoutubeEmbed(url: string): SafeResourceUrl | string {
    if (!url)
      return '';

    var videoId = url.split('v=')[1];
    var ampersandPos = url.indexOf('&');
    if (ampersandPos !== -1)
      videoId = videoId.substring(0, ampersandPos);

    return this.#sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  rate(score: number) {
    if (!this.#securityService.isLogged()) {
      Swal.fire('Error', 'Debes iniciar sesión para poder votar', 'error');
      return;
    }

    this.#ratingsService.rate(this.id, score).subscribe(() => {
      Swal.fire('Exitoso', 'Su voto ha sido enviado', 'success');
      return;
    });
  }
}
