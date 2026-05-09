import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";
import { CurrentTargetState, GameChallenge } from "../../interfaces/game.interface";
import { ChallengeService } from "../../services/challenge.service";
import { ActionService } from "../../services/action.service";
import { GameDataService } from "../../services/game-data.service";

@Component({
  selector: "app-question-screen",
  templateUrl: "./question-screen.component.html",
  styleUrl: "./question-screen.component.scss",
  standalone: false
})
export class QuestionScreenComponent implements OnInit,  OnDestroy {
  private currentChallengeSubscription!: Subscription;
  private currentTargetStateSubscription!: Subscription;
  currentChallenge = signal<GameChallenge | null>(null);
  userAnswer: string = '';
  question = "question";

  targetId = signal<number | null>(null);

  constructor(
    private datService: GameDataService,
    private actionService: ActionService,
    private currentTargetService: CurrentTargetService,
    private challengeService: ChallengeService,
  ){}


  ngOnInit(): void {
    this.subscribeToCurrentChallenge();
    this.subscribeToCurrentTargetState();
  }

  selectAnswer(option: any){}

  subscribeToCurrentTargetState(){
    this.currentTargetStateSubscription = this.currentTargetService
    .getCurrentTargetState$.subscribe((state: CurrentTargetState | null )=> {
      console.log(state, "hello");
      this.targetId.set(state?.getTargetId() ?? null);
    })
  }

  subscribeToCurrentChallenge() {
    this.currentChallengeSubscription = this.challengeService
    .getCurrentChallenge$.subscribe((challenge: GameChallenge | null) => {
      this.currentChallenge.set(challenge);
    })
  }

  close(){}

  validate() {
    if (!this.userAnswer) {
      console.log('⚠️ No answer provided');
      return;
    }

    const challengeIndex = this.currentTargetService.getCurrentTargetState()?.getCurrentChallengeIndex();
    if (this.targetId() === 1) {
      if (challengeIndex === 0){
        this.actionService.onClose();
        this.actionService.openActionModal('countdown');
      } else {
      this.actionService.onClose();
      }
      return
    }


    const nextTargetId = this.currentTargetService.getCurrentTargetState()?.getNextTargetId();

    // End of target one
    if (this.targetId() === 1 && challengeIndex === 1){
      // Set the new target
      if(nextTargetId){
        const target =  this.datService.getTargetById(nextTargetId);
        console.log(target);
        // Set current target
        //this.currentTargetService.setCurrentTarget(target);
      }
    }

    if (this.targetId() == 2){
        this.actionService.onClose();
        this.actionService.openActionModal('standard');
    }



    if (this.userAnswer.toLowerCase().includes(this.currentChallenge()?.question?.answer!)) {
      console.log('🎉 Correct answer!');

      this.onSuccess();
    } else {
      console.log('❌ Wrong answer');
    }
}

  onSuccess() {
    // close modal + unlock next checkpoint
  }

  ngOnDestroy(): void {
    this.currentTargetStateSubscription?.unsubscribe();
    this.currentChallengeSubscription?.unsubscribe();
  }
}
