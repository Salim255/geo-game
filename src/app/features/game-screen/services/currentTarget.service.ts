import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameTarget } from "./game-data.service";

@Injectable({providedIn: "root"})
export class CurrentTargetService {
  private currentTargetSubject = new BehaviorSubject< GameTarget | null>(null);


  setCurrentTarget(target: GameTarget | null): void{
    this.currentTargetSubject.next(target);
  }
}
