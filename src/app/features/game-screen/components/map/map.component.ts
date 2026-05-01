import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as L from 'leaflet';
import { GpsService } from '../../services/gps.service';
import { Subscription } from 'rxjs';

type LatLng = { lat: number; lng: number };

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone: false
})
export class MapComponent implements OnInit, OnDestroy {

  private map!: L.Map;
  private userMarker!: L.Marker;
  private targetCircle!: L.Circle;

  private pulseInterval: any;
  private gpsSub!: Subscription;

  // 🎯 INPUTS from GameScreen or GameService
  @Input() target!: LatLng & { radius: number };
  @Input() targets: any[] = [];

  constructor(private gps: GpsService) {}

  // ================= INIT =================
  ngOnInit() {
    this.initMap();
    this.renderTargets();
    this.renderTargetZone();
    this.startTracking();
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
      fillOpacity: 0.2
    }).addTo(this.map);
  }

  // ================= GPS =================
  private startTracking() {
    const userIcon = this.createUserIcon();

    this.gps.startFakeTracking(
      50.632615310744754,
      3.013675532644488,
      (pos) => this.updateUser(pos, userIcon)
    );

    // REAL GPS
    /*
    this.gps.startTracking((pos) =>
      this.updateUser(pos, userIcon)
    );
    */
  }

  private updateUser(pos: GeolocationPosition, icon: L.Icon) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    if (!this.userMarker) {
      this.userMarker = L.marker([lat, lng], { icon })
        .addTo(this.map)
        .bindPopup('📍 You');
    } else {
      this.userMarker.setLatLng([lat, lng]);
    }

    this.map.panTo([lat, lng]);
  }

  // ================= VISUAL EFFECT =================
  public pulseTarget() {
    let step = 0;

    const interval = setInterval(() => {
      step++;

      const newRadius = this.target.radius + step * 10;
      this.targetCircle.setRadius(newRadius);

      if (step > 6) {
        clearInterval(interval);
        this.targetCircle.setRadius(this.target.radius);
      }

    }, 100);
  }

  public moveTarget(lat: number, lng: number) {
    this.targetCircle.setLatLng([lat, lng]);
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
    return L.icon({
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

  // ================= CLEANUP =================
  ngOnDestroy() {
    this.gps.stopTracking();
    if (this.pulseInterval) clearInterval(this.pulseInterval);
    this.gpsSub?.unsubscribe();
  }
}
