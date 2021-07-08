import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  @Output() coords: EventEmitter<any> = new EventEmitter<any>();
  latitude = 0;
  longitude = 0;
  zoom = 10;
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      const location = { lat: this.latitude, lng: this.longitude };
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: this.zoom,
          center: location,
        }
      );
      const marker = new google.maps.Marker({
        position: location,
        map,
      });

      const mapa = {
        map_latitude: this.latitude,
        map_longitude: this.longitude
      };

      this.coords.emit(mapa);

    });
  }
}
