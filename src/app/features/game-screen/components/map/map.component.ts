import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import * as L from 'leaflet';
import { GpsService } from '../../services/gps.service';

type LatLng = { lat: number; lng: number };

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone:false
})
export class MapComponent implements OnInit, OnDestroy {

  private map!: L.Map;
  private userMarker!: L.Marker;
  private targetCircle!: L.Circle;
  isInZone = false;

  // 🎯 Active target
  target: LatLng & { radius: number } = {
    lat: 50.6329,
    lng: 3.0138,
    radius: 50
  };

  // 🎯 Future targets
  targets: Array<{ id: number } & LatLng> = [
    { id: 1, lat: 50.6329, lng: 3.0138 },
    { id: 2, lat: 50.6335, lng: 3.0150 },
    { id: 3, lat: 50.6342, lng: 3.0162 }
  ];

  // 📍 reactive state
  lat = signal<number | null>(null);
  lng = signal<number | null>(null);

  constructor(private gps: GpsService) {}

  // ================= INIT =================
  ngOnInit() {
    this.initMap();
    this.renderTargets();
    this.renderTargetZone();
    this.startTracking();

    console.log('🗺️ Map initialized');
  }

  // ================= MAP =================
  private initMap() {
    this.map = L.map('map').setView(
      [this.target.lat, this.target.lng],
      15
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  // ================= TARGETS =================
  private renderTargets() {
    const icon = this.createTargetIcon();

    this.targets.forEach(t => {
      L.marker([t.lat, t.lng], { icon })
        .addTo(this.map)
        .bindPopup(`🎯 Target ${t.id}`);
    });
  }

  private renderTargetZone() {
    this.targetCircle = L.circle([this.target.lat, this.target.lng], {
      radius: this.target.radius,
      color: 'red',
      fillOpacity: 0.1
    }).addTo(this.map);
  }

  private animateTargetZone() {
    let scale = 1;

    const interval = setInterval(() => {
      scale += 0.2;

      this.targetCircle.setStyle({
        fillOpacity: 0.1 * scale
      });

      if (scale > 2) {
        clearInterval(interval);
        this.targetCircle.setStyle({ fillOpacity: 0.1 });
      }
    }, 150);
  }

  private showTargetPopup() {
    L.popup()
      .setLatLng([this.target.lat, this.target.lng])
      .setContent("🎉 You reached the target!")
      .openOn(this.map);
  }

  // ================= GPS =================
  private startTracking() {
    const userIcon = this.createUserIcon();

    // 🧪 DEV MODE (FAKE GPS)
    this.gps.startFakeTracking(
      50.632615310744754,
      3.013675532644488,
      (pos) => this.handlePositionUpdate(pos, userIcon)
    );

    // 📍 PROD MODE (REAL GPS)
    /*
    this.gps.startTracking((pos) =>
      this.handlePositionUpdate(pos, userIcon)
    );
    */
  }

  private handlePositionUpdate(
    pos: GeolocationPosition,
    icon: L.Icon
  ) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    this.lat.set(lat);
    this.lng.set(lng);

    console.log('📍 User:', lat, lng);

    this.updateUserMarker(lat, lng, icon);
    this.checkZone(lat, lng);
  }

  // ================= USER =================
  private updateUserMarker(lat: number, lng: number, icon: L.Icon) {
    if (!this.userMarker) {
      this.userMarker = L.marker([lat, lng], { icon })
        .addTo(this.map)
        .bindPopup('📍 You');
    } else {
      this.userMarker.setLatLng([lat, lng]);
    }

    // smooth follow instead of jump
    this.map.panTo([lat, lng]);
  }

  // ================= GAME LOGIC =================
  private checkZone(lat: number, lng: number) {
    const distance = this.gps.getDistance(
      lat,
      lng,
      this.target.lat,
      this.target.lng
    );

    console.log('📏 Distance:', distance);

    if (distance < this.target.radius && !this.isInZone) {
      this.isInZone = true;
      this.onEnterZone(); // ✅ trigger reaction
    }

    if (distance >= this.target.radius && this.isInZone) {
      this.isInZone = false;
      //this.onLeaveZone();
    }
  }
  private checkZone1(lat: number, lng: number) {
    const distance = this.gps.getDistance(
      lat,
      lng,
      this.target.lat,
      this.target.lng
    );

    console.log('📏 Distance:', distance);

    if (distance < this.target.radius && !this.isInZone) {
      this.isInZone = true;
      console.log('🎉 ENTER ZONE');
    }

    if (distance >= this.target.radius && this.isInZone) {
      this.isInZone = false;
      console.log('↩️ EXIT ZONE');
    }
  }

  // ================= ICONS =================
  private createUserIcon(): L.Icon {
    return L.icon({
      iconUrl:
        'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <circle cx="20" cy="20" r="8" fill="#2b6cff"/>
            <circle cx="20" cy="20" r="14" fill="none" stroke="#2b6cff" stroke-opacity="0.3" stroke-width="6"/>
          </svg>
        `),
      iconSize: [80, 80],
      iconAnchor: [40, 40],
    });
  }

  private createTargetIcon(): L.Icon {
    L.icon({
      iconUrl:
        'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <circle cx="16" cy="16" r="10" fill="red"/>
          </svg>
        `),
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }

  private onEnterZone() {
    console.log('🎉 TARGET REACHED');

    this.showTargetPopup();
    this.animateTargetZone();
    this.playSuccessSound();
    this.speak("Target reached. Well done!");
  }

  // ================= CLEANUP =================
  ngOnDestroy() {
    this.gps.stopTracking();
  }
}
