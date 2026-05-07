import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";
import { CurrentTargetState, GameChallenge, GameTarget } from "../../interfaces/game.interface";
import { ChallengeService } from "../../services/challenge.service";
import { ActionService } from "../../services/action.service";

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
        this.targetId.set(state?.getTargetId() ?? null);
    })
  }

  subscribeToCurrentChallenge() {
    this.currentChallengeSubscription = this.challengeService
    .getCurrentChallenge$.subscribe((challenge: GameChallenge | null) => {
      console.log(challenge);
      this.currentChallenge.set(challenge);
    })
  }

  close(){}

  validate() {
    if (!this.userAnswer) {
      console.log('⚠️ No answer provided');
      return;
    }

    console.log('User answer:', this.userAnswer);
    this.actionService.openActionModal();
    if (this.userAnswer.toLowerCase().includes('silence')) {
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
