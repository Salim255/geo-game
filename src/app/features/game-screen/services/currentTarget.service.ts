import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentTargetState, GameTarget } from "../interfaces/game.interface";
import { ChallengeService } from "./challenge.service";
import { MatDialog } from "@angular/material/dialog";
import { TargetHandlerComponent } from "../components/target-handler/target-handler.component";


@Injectable({providedIn: "root"})
export class CurrentTargetService {
  private userAnswerSubject = new BehaviorSubject<string | null>(null);
  private currentTargetStateSubject = new BehaviorSubject<CurrentTargetState | null>(null);
  private currentTargetSubject = new BehaviorSubject< GameTarget | null>(null);

  constructor(
    private modalCtr: MatDialog,
    private challengeService: ChallengeService,
  ){}

  setUserAnser(answer: string){
    this.userAnswerSubject.next(answer);
  }

  openTargetHandlerDialog() {
    this.modalCtr.open(TargetHandlerComponent, {
      disableClose: true,
      maxWidth: "96vw",
      maxHeight: "96vh",
      data: {
        title: 'Target handler',
      }
    });
  }

  setCurrentTargetState(target: CurrentTargetState | null): void{
    this.currentTargetStateSubject.next(target);
  }

  setCurrentTarget(target: GameTarget | null): void{
    if(!target) return;
    const currentTargeState = new CurrentTargetState();
    currentTargeState.buildFromTarget(target);
    this.setCurrentTargetState(currentTargeState);
    this.currentTargetSubject.next(target);
  }

  get getCurrentTargetState$(): Observable<CurrentTargetState | null>{
    return this.currentTargetStateSubject.asObservable();
  }

  get getCurrentTarget$(): Observable<GameTarget | null>{
    return this.currentTargetSubject.asObservable();
  }

  get getUserAnswer$(): Observable<string | null>{
    return this.userAnswerSubject.asObservable();
  }

  getCurrentTarget():GameTarget | null{
    return this.currentTargetSubject.value;
  }

  getCurrentTargetState():CurrentTargetState | null{
    return this.currentTargetStateSubject.value;
  }

  onClose(){
    this.modalCtr.closeAll();
  }
}
