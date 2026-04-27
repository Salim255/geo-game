import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GpsService } from './services/gps.service';
import { MapComponent } from "./components/map/map.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('geo-game');
isInZone = false;

target = {
  lat: 50.6329,   // small change
  lng: 3.0138,    // small change
  radius: 50
};

  lat = signal<number>(0);
  lng = signal<number>(0);

  constructor(private gps: GpsService) {}

  ngOnInit() {
    this.gps.watchPosition((pos) => {
      this.lat.set(pos.coords.latitude);
      this.lng.set(pos.coords.longitude);

      console.log('Latitude:', this.lat());
      console.log('Longitude:', this.lng());

         // create nearby target dynamically (50m away)
    this.target = {
      lat: this.lat() + 0.0004,
      lng: this.lng() + 0.0004,
      radius: 60
    };


    const distance = this.gps.getDistance(
      this.lat(),
      this.lng(),
      this.target.lat,
      this.target.lng
    );

    console.log('Distance:', distance);

   if (distance < this.target.radius && !this.isInZone) {
      this.isInZone = true;

      console.log('🎉 You reached the location!');

    }

    if (distance >= this.target.radius) {
      this.isInZone = false;
    }
    });
  }
}
