import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GameTarget } from "../interfaces/game.interface";


@Injectable({providedIn: "root"})
export class CurrentTargetService {
  private currentTargetSubject = new BehaviorSubject< GameTarget | null>(null);


  setCurrentTarget(target: GameTarget | null): void{
    this.currentTargetSubject.next(target);
  }

  get getCurrentTarget$(): Observable<GameTarget | null>{
    return this.currentTargetSubject.asObservable();
  }
}
