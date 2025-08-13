import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, MarkerOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Coordinate } from './coordinate';

@Component({
  selector: 'app-map',
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  ngOnInit(): void {
    this.layers = this.initalCoordinates.map(value => {
      const markr = marker([value.latitude, value.length], this.markerOptions);

      if (value.text)
        markr.bindPopup(value.text, { autoClose: false, autoPan: false});
      
      return markr;
    })
  }
  @Input()
  initalCoordinates: Coordinate[] = [];

  @Input()
  readonly = false;

  @Output()
  selectedCoordinate = new EventEmitter<Coordinate>();

  markerOptions: MarkerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon-png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  };

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 14,
    center: latLng(28.673858308531702, -106.10113279269243)
  };

  layers: Marker<any>[] = [];
  handleClick(event: LeafletMouseEvent) {
    if (this.readonly)
      return;
    const latitude = event.latlng.lat;
    const length = event.latlng.lng;

    this.layers = []
    this.layers.push(marker([latitude, length], this.markerOptions));
    this.selectedCoordinate.emit({ latitude, length });
  }
}
