import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";
import { GameChallenge, GameTarget } from "../../interfaces/game.interface";
import { ChallengeService } from "../../services/challenge.service";

@Component({
  selector: "app-question-screen",
  templateUrl: "./question-screen.component.html",
  styleUrl: "./question-screen.component.scss",
  standalone: false
})
export class QuestionScreenComponent implements OnInit,  OnDestroy {
  private currentChallengeSubscription!: Subscription;
  currentChallenge = signal<GameChallenge | null>(null);
  userAnswer: string = '';
  question = "question";

  constructor(private challengeService: ChallengeService){}


  ngOnInit(): void {
    this.subscribeToCurrentChallenge();
   }

  selectAnswer(option: any){}

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

  console.log('User answer:', this.userAnswer);

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
    this.currentChallengeSubscription?.unsubscribe();
  }
}
