import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentTargetState, GameTarget } from "../interfaces/game.interface";
import { MatDialog } from "@angular/material/dialog";
import { QuestionScreenComponent } from "../components/question-screen/question-screen.component";
import { PuzzleInstructionComponent } from "../components/puzzle-instruction/puzzle-instruction.component";


@Injectable({providedIn: "root"})
export class CurrentTargetService {
  private userAnswerSubject = new BehaviorSubject<string | null>(null);
  private currentTargetStateSubject = new BehaviorSubject<CurrentTargetState | null>(null);
  private currentTargetSubject = new BehaviorSubject< GameTarget | null>(null);

  constructor(private modalCtr: MatDialog){}

  setUserAnswer(answer: string){
    this.userAnswerSubject.next(answer);
  }

  openTargetHandlerDialog(componentType: 'puzzle' | 'question' ) {
    const component =
      componentType==='question'
      ? QuestionScreenComponent :
       PuzzleInstructionComponent;

    this.modalCtr.open(component, {
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
