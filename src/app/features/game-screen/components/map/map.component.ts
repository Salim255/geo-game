import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { GpsService } from '../../services/gps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone: false
})
export class MapComponent implements OnInit, OnDestroy {

  map!: L.Map;
  userMarker!: L.Marker;

  isInZone = false;

  // 🎯 target location
  target = {
    lat: 50.6329,
    lng: 3.0138,
    radius: 50
  };

  // multiple targets (future use)
  targets = [
    { id: 1, lat: 50.6329, lng: 3.0138 },
    { id: 2, lat: 50.6335, lng: 3.0150 },
    { id: 3, lat: 50.6342, lng: 3.0162 }
  ];

  constructor(private gps: GpsService) {}

  ngOnInit() {
    this.initMap();
    this.addTargets();
    this.drawTargetZone();
    this.startGPS();

    console.log('🗺️ Map initialized');
  }

  // 🗺️ INIT MAP
  initMap() {
    this.map = L.map('map').setView(
      [this.target.lat, this.target.lng],
      15
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  // 🔴 TARGET MARKERS
  addTargets() {
    const redIcon = L.icon({
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

    this.targets.forEach(t => {
      L.marker([t.lat, t.lng], { icon: redIcon })
        .addTo(this.map)
        .bindPopup(`🎯 Target ${t.id}`);
    });
  }

  // 🎯 DRAW TARGET ZONE (circle)
  drawTargetZone() {
    L.circle([this.target.lat, this.target.lng], {
      radius: this.target.radius,
      color: 'red',
      fillOpacity: 0.1
    }).addTo(this.map);
  }

  // 📡 START GPS TRACKING
  startGPS() {

    const userIcon = L.icon({
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

    this.gps.startTracking((pos) => {

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      console.log('📍 User:', lat, lng);

      // 📏 Distance calculation
      const distance = this.gps.getDistance(
        lat,
        lng,
        this.target.lat,
        this.target.lng
      );

      console.log('📏 Distance:', distance);

      // 🎯 Zone detection
      if (distance < this.target.radius && !this.isInZone) {
        this.isInZone = true;
        console.log('🎉 You reached the target!');
      }

      if (distance >= this.target.radius && this.isInZone) {
        this.isInZone = false;
        console.log('↩️ You left the zone');
      }

      // 🗺️ Update marker
      if (!this.userMarker) {
        this.userMarker = L.marker([lat, lng], { icon: userIcon })
          .addTo(this.map)
          .bindPopup('📍 You');
      } else {
        this.userMarker.setLatLng([lat, lng]);
      }

      // 🎯 Center map on user
      this.map.setView([lat, lng], 16);
    });
  }

  // 🧹 CLEANUP
  ngOnDestroy() {
    this.gps.stopTracking();
  }
}
