import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { ActionService } from "../../services/action.service";
import { ChallengeService } from "../../services/challenge.service";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-action-countdown",
  templateUrl: "./action-countdown.component.html",
  styleUrl: "./action-countdown.component.scss",
  standalone: false
})
export class ActionCountdownComponent implements OnInit, OnDestroy {
  private userAnserSubscription!: Subscription;
  actionText = "Criez votre cri de guerre !";

  countdownValue = signal<string>("");
  showReady = signal<boolean>(true);
  showConfirmation = signal<boolean>(false);
  coolDown = false;

  userAnswer = signal<string| null>(null);

  constructor(
    private currentTargetService: CurrentTargetService,
    private challengeService: ChallengeService,
    private actionService: ActionService,
  ){}

  ngOnInit(): void {
    this.subscribeToUserAnser();
  }

  private subscribeToUserAnser(){
    this.userAnserSubscription = this.currentTargetService
    .getUserAnswer$.subscribe((answer: string | null) => {
      this.userAnswer.set(answer)
    })
  }
  startCountdown() {
    if (this.coolDown) return;
    this.coolDown = true;
    setTimeout(() => (this.coolDown = false), 1500);

    this.showReady.set(false);
    this.countdownValue.set("");

    const steps = ["3", "2", "1", "GO !"];
    let i = 0;

    const interval = setInterval(() => {
      this.countdownValue.set(steps[i]);   // 👈 SIGNAL UPDATE
      i++;

      if (i === steps.length) {
        clearInterval(interval);

        setTimeout(() => {
          this.showConfirmation.set(true); // 👈 SIGNAL UPDATE
        }, 700);
      }
    }, 1000);
  }

  confirmSuccess() {
    this.actionService.onClose();

    // Set next challenge
    const target = this.currentTargetService.getCurrentTarget();
    const currentState = this.currentTargetService.getCurrentTargetState();
    const nexChallenge = target?.challenges[1];
    if (!nexChallenge) return;
    currentState?.setCurrentChallengeIndex(1);
    this.challengeService.setCurrentChallenge(nexChallenge);
    this.challengeService.openQuestionDialog();
  }

  retry() {
    this.showConfirmation.set(false);
    this.showReady.set(true);
    this.countdownValue.set("");
  }

  ngOnDestroy(): void {
      this.userAnserSubscription?.unsubscribe();
  }
}
