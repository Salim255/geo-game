import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GpsService {

  private watchId: number | null = null;
  private lastPosition: GeolocationPosition | null = null;

  // 🧪 FAKE GPS SIMULATION (FOR DEV)
  startFakeTracking(
    startLat: number,
    startLng: number,
    callback: (pos: GeolocationPosition) => void
  ) {
    let lat = startLat;
    let lng = startLng;

    this.watchId = setInterval(() => {

      // 👉 simulate movement (small steps)
      lat += 0.0001;
      lng += 0.00015;

      const fakePosition = {
        coords: {
          latitude: lat,
          longitude: lng
        }
      } as GeolocationPosition;

      callback(fakePosition);

    }, 1500);
  }


  startTracking(callback: (pos: GeolocationPosition) => void) {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    // 🔹 1. Get fast initial position
    navigator.geolocation.getCurrentPosition(
      (pos) => {

        this.lastPosition = pos;
        console.log(
      "📍 Position mise à jour:",
      "lat:", pos.coords.latitude.toFixed(6),
      "lng:", pos.coords.longitude.toFixed(6),
      "accuracy:", pos.coords.accuracy
    );
        callback(pos);
      },
      (err) => console.warn(err),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );

    // 🔹 2. Start watching for updates
      this.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        this.lastPosition = pos;
        console.log(
          "🚀 Position initiale:",
          "lat:", pos.coords.latitude.toFixed(6),
          "lng:", pos.coords.longitude.toFixed(6),
          "accuracy:", pos.coords.accuracy
        );
        callback(pos);
      },
      (err) => {
        this.handleError(err, callback);
      },
      {
        enableHighAccuracy: true,   // 🔥 OBLIGATOIRE
        timeout: 20000,             // laisse le GPS se réveiller
        maximumAge: 0,              // jamais de cache
      }
    );
  }

  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  private handleError(
    error: GeolocationPositionError,
    callback: (pos: GeolocationPosition) => void
  ) {
    if (error.code === error.TIMEOUT) {
      console.warn('⏳ Timeout → using last known position');

      if (this.lastPosition) {
        callback(this.lastPosition); // ✅ fallback
      }
      return;
    }

    if (error.code === error.PERMISSION_DENIED) {
      console.error('❌ Permission denied');
    }

    if (error.code === error.POSITION_UNAVAILABLE) {
      console.warn('⚠️ Position unavailable → fallback');

      if (this.lastPosition) {
        callback(this.lastPosition);
      }
    }
  }

   // ✅ KEEP THIS — your distance logic
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // meters
  }

  getLastPosition() {
    return this.lastPosition;
  }
}
