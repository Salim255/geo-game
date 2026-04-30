import { Component, OnInit, OnDestroy, signal } from "@angular/core";
import { GpsService } from "./services/gps.service";
import { InstructionService } from "./services/instructions.service";
import { ScreenGameService } from "./services/screen-game.service";

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

  constructor(
    private screenGameService: ScreenGameService,
    private inst: InstructionService,
    private gps: GpsService,
  ) {}

  ngOnInit() {
    console.log("game screen")
    this.gps.startTracking((pos) => {

      const currentLat = pos.coords.latitude;
      const currentLng = pos.coords.longitude;

      this.lat.set(currentLat);
      this.lng.set(currentLng);

      console.log('📍 Position:', currentLat, currentLng);

      const distance = this.gps.getDistance(
        currentLat,
        currentLng,
        this.target.lat,
        this.target.lng
      );

      console.log('📏 Distance:', distance);

      // ✅ Enter zone
      if (distance < this.target.radius && !this.isInZone) {
        this.isInZone = true;
        this.onEnterZone()
        console.log('🎉 You reached the location!');
      }

      // ✅ Exit zone
      if (distance >= this.target.radius && this.isInZone) {
        this.isInZone = false;
        console.log('↩️ You left the zone');
        this.onLeaveZone();
      }
    });
  }

  private onEnterZone() {
    this.screenGameService.openInstructions();
  }

  private onLeaveZone() {
    // optional UI reset
  }

  ngOnDestroy() {
    this.gps.stopTracking(); // ✅ VERY IMPORTANT
  }
}
