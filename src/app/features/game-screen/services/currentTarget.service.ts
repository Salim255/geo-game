import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentTargetState, GameTarget } from "../interfaces/game.interface";


@Injectable({providedIn: "root"})
export class CurrentTargetService {
  private currentTargetStateSubject = new BehaviorSubject<CurrentTargetState | null>(null);
  private currentTargetSubject = new BehaviorSubject< GameTarget | null>(null);


  setCurrentTargetState(target: CurrentTargetState | null): void{
    this.currentTargetStateSubject.next(target);
  }

  get getCurrentTargetState$(): Observable<CurrentTargetState | null>{
    return this.currentTargetStateSubject.asObservable();
  }

   setCurrentTarget(target: GameTarget | null): void{
    this.currentTargetSubject.next(target);
  }

  get getCurrentTarget$(): Observable<GameTarget | null>{
    return this.currentTargetSubject.asObservable();
  }
}
