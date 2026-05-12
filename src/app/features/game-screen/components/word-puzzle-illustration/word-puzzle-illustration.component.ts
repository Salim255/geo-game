import { Component, OnInit, signal } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { ChallengeService } from "../../services/challenge.service";
import { Subscription } from "rxjs";
import { GameChallenge } from "../../interfaces/game.interface";

@Component({
  selector: "app-wd-puzzle",
  templateUrl: "./word-puzzle-illustration.component.html",
  styleUrl: "./word-puzzle-illustration.component.scss",
  standalone: false
})
export class WordPuzzleIllustrationComponent implements OnInit{
  private currentChallengeSubscription!: Subscription;
  currentChallenge = signal<GameChallenge | null>(null);

  userAnswer: string = '';

  constructor(
    private challengeService: ChallengeService,
    private currentTargetService: CurrentTargetService,
  ){}

  ngOnInit(): void {
    this.subscribeToCurrentChallenge();
  }

  subscribeToCurrentChallenge() {
    this.currentChallengeSubscription = this.challengeService
    .getCurrentChallenge$.subscribe((challenge: GameChallenge | null) => {
      this.currentChallenge.set(challenge);
    })
  }

  onSend(){
    if (!this.userAnswer) {
      console.log('⚠️ No answer provided');
      return;
    }

    if (this.userAnswer.toLowerCase().includes(this.currentChallenge()?.question?.answer!)) {
      this.onSuccess();
    } else {
      console.log('❌ Wrong answer', this.currentChallenge()?.question?.answer);
    }
  }

  onSuccess() {
    this.currentTargetService.onClose();
    this.currentTargetService.setUserAnswer(this.userAnswer);
  }

  ngOnDestroy(): void {
    this.currentChallengeSubscription?.unsubscribe();
  }
}
