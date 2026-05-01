import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class GameService {

  private interval: any;

  // 🎯 create movement path
  createPath(start: any, end: any, steps: number) {
    const path = [];

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;

      path.push({
        lat: start.lat + (end.lat - start.lat) * t,
        lng: start.lng + (end.lng - start.lng) * t
      });
    }

    return path;
  }

  // 🎯 animate target movement
  moveTargetAlongPath(
    path: any[],
    onUpdate: (point: any) => void,
    onComplete: () => void
  ) {
    let i = 0;

    this.interval = setInterval(() => {

      if (i >= path.length) {
        clearInterval(this.interval);
        onComplete();
        return;
      }

      onUpdate(path[i]);
      i++;

    }, 2000);
  }

  stopMovement() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
