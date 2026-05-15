import { Component, OnInit, signal } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { ChallengeService } from "../../services/challenge.service";
import { Subscription } from "rxjs";
import { GameChallenge } from "../../interfaces/game.interface";
import { ToastService } from "../../../../shared/kits/toast/toast.service";

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
    private toastService: ToastService
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
      this.toastService.error('⚠️ No answer provided');
      return;
    }
    if (this.userAnswer.toLowerCase().includes(this.currentChallenge()?.question?.answer!)) {
      this.onSuccess();
    } else {
      this.toastService.error("Mauvaise réponse. Essayez encore.");
    }
  }

  onSuccess() {
    this.toastService.success(`Bonne réponse, bien joué !`);
    this.currentTargetService.onClose();
    this.currentTargetService.setUserAnswer(this.userAnswer);
  }

  ngOnDestroy(): void {
    this.currentChallengeSubscription?.unsubscribe();
  }
}
