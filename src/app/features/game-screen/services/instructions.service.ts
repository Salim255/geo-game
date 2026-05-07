import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { InstructionsComponent } from "../components/instructions/instructions.component";
import { QuestionScreenComponent } from "../components/question-screen/question-screen.component";
import { GameTarget } from "../interfaces/game.interface";

@Injectable({providedIn: "root"})
export class InstructionService {
  private currentTargetSubscription = new BehaviorSubject<GameTarget | null>(null)
  private instructionModalSubject = new BehaviorSubject<boolean>(false);

  constructor(private modalCtr: MatDialog ){}

  setInstructionModalStatus(status: boolean){
    this.instructionModalSubject.next(status);
  }

  get getInstructionModalStatus():Observable<boolean>{
    return this.instructionModalSubject.asObservable();
  }

  openInstructions() {
    this.modalCtr.open(InstructionsComponent, {
      disableClose: false,
      panelClass: 'dialog-wide',
      maxWidth: "96vw",
      maxHeight: "96vh",
      data: {
        title: 'Game Instructions'
      }
    });
  }

  setCurrentTarget(target: GameTarget){
    this.currentTargetSubscription.next(target);
  }

  get getCurrentTarget(): Observable<GameTarget | null>{
    return this.currentTargetSubscription.asObservable();
  }

  onClose(){
    this.modalCtr.closeAll();
  }
}
