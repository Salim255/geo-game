import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { GameChallenge, GameTarget } from "../../interfaces/game.interface";
import { ActionService } from "../../services/action.service";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { ChallengeService } from "../../services/challenge.service";
import { Subscription } from "rxjs";
import { ToastService } from "../../../../shared/kits/toast/toast.service";

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
    private toastService: ToastService,
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
        this.targetId.set(target.id);
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
        this.toastService.error("Veuillez entrer une réponse.");
        return;
      }

      const correctAnswer = this.currentChallenge()?.question?.answer.toLowerCase().trim();
      const userAnswerNormalized = this.userAnswer.toLowerCase().trim();

      if(correctAnswer === "" && this.targetId() == 1){
        this.onSuccess();
        return;
      }

      if (userAnswerNormalized === correctAnswer) {
        this.toastService.success(`Bonne réponse, bien joué !`);
        this.onSuccess();
      } else {
        this.toastService.error("Mauvaise réponse. Essayez encore.");
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
