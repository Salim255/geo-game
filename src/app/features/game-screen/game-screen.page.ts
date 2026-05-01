import { Component, OnInit, OnDestroy, signal } from "@angular/core";
import { GpsService } from "./services/gps.service";
import { GameDataService } from "./services/game-data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-game-screen",
  templateUrl: "./game-screen.page.html",
  styleUrl: "./game-screen.page.scss",
  standalone: false
})
export class GameScreenPage implements OnInit, OnDestroy {

  isInZone = false;

  target = {
    lat: 50.6329,
    lng: 3.0138,
    radius: 50
  };

  lat = signal<number>(0);
  lng = signal<number>(0);

  private gameDataSubscription!: Subscription;
  constructor(
    private gameData: GameDataService,
    private gps: GpsService,
  ) {}

  ngOnInit() {

    console.log("🎮 Game started");

/*     this.gps.startTracking((pos) => {

      const currentLat = pos.coords.latitude;
      const currentLng = pos.coords.longitude;

      this.lat.set(currentLat);
      this.lng.set(currentLng);

      console.log("📍 User:", currentLat, currentLng);

      const distance = this.gps.getDistance(
        currentLat,
        currentLng,
        this.target.lat,
        this.target.lng
      );

      console.log("📏 Distance:", distance);


      if (distance < this.target.radius && !this.isInZone) {
        this.isInZone = true;
        this.onEnterZone();
        console.log("🎉 Target reached!");
      }


      if (distance >= this.target.radius && this.isInZone) {
        this.isInZone = false;
        this.onLeaveZone();
        console.log("↩️ Left zone");
      }
    }); */
  }

  private onEnterZone() {
    // open question modal
    // this.screenGameService.openInstructions();
  }

  private onLeaveZone() {}

  ngOnDestroy() {
    this.gps.stopTracking();
    this.gameDataSubscription?.unsubscribe();
  }
}
