import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { GameChallenge, GameTarget } from "../../interfaces/game.interface";
import { ActionService } from "../../services/action.service";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { ChallengeService } from "../../services/challenge.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-question-form",
  templateUrl: "./question-form.component.html",
  styleUrl: "./question-form.component.scss",
  standalone: false
})

export class QuestionFormComponent  implements OnInit, OnDestroy {
  private currentChallengeSubscription!: Subscription;
  private currentTargetSubscription!: Subscription;
  currentChallenge = signal<GameChallenge | null>(null);
  userAnswer: string = '';
  question = "question";

  targetId = signal<number | null>(null);
  currentTargetName = signal<string | null>(null);
  constructor(
    private actionService: ActionService,
    private currentTargetService: CurrentTargetService,
    private challengeService: ChallengeService,
  ){}


  ngOnInit(): void {
    this.subscribeToCurrentChallenge();
    this.subscribeToCurrentTarget();
  }

  subscribeToCurrentTarget(){
    this.currentTargetSubscription = this.currentTargetService
    .getCurrentTarget$.subscribe((target: GameTarget| null) => {
      if(target){
        this.currentTargetName.set(target.name);
      }
    })
  }
  subscribeToCurrentChallenge() {
    this.currentChallengeSubscription = this.challengeService
    .getCurrentChallenge$.subscribe((challenge: GameChallenge | null) => {
      this.currentChallenge.set(challenge);
    })
  }

  validate() {
    if (!this.userAnswer) {
      console.log('⚠️ No answer provided');
      return;
    }

    if (this.userAnswer.toLowerCase().includes(this.currentChallenge()?.question?.answer!)) {
      this.onSuccess();
    } else {
      console.log('❌ Wrong answer');
      //this.actionService.onClose();
    }
}

  onSuccess() {
    this.actionService.onClose();
    this.currentTargetService.setUserAnswer(this.userAnswer);
  }

  ngOnDestroy(): void {
    this.currentTargetSubscription?.unsubscribe();
    this.currentChallengeSubscription?.unsubscribe();
  }
}
