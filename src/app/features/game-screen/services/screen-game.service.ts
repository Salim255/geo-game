import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { QuestionScreenComponent } from "../components/question-screen/question-screen.component";

@Injectable({providedIn: "root"})
export class ScreenGameService {
  private interval: any;
  constructor(private modalCtr:  MatDialog ){}
   openQuestionDialog() {
    this.modalCtr.open(QuestionScreenComponent, {
      disableClose: true,
      data: {
        title: 'Game Instructions'
      }
    });
  }

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
