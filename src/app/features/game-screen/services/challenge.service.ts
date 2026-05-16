import { Injectable } from "@angular/core";
import { GameChallenge, GameTarget } from "../interfaces/game.interface";
import { QuestionScreenComponent } from "../components/question-screen/question-screen.component";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class ChallengeService {
  private currentChallengeSubject = new BehaviorSubject<GameChallenge | null>(null);

  constructor(private modalCtr: MatDialog){}


  setCurrentChallenge(challenge: GameChallenge | null ){
    this.currentChallengeSubject.next(challenge);
  }

  get getCurrentChallenge$(): Observable<GameChallenge |  null>{
    return this.currentChallengeSubject.asObservable();
  }

  openQuestionDialog() {
    this.modalCtr.open(QuestionScreenComponent, {
      disableClose: true,
      maxWidth: "96vw",
      maxHeight: "96vh",
      data: {
        title: 'Game Instructions',
      }
    });
  }

  onClose(){
    this.modalCtr.closeAll();
  }
}
