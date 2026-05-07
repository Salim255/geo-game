import { Component, signal } from "@angular/core";
import { ActionService } from "../../services/action.service";
import { ChallengeService } from "../../services/challenge.service";
import { CurrentTargetService } from "../../services/currentTarget.service";

@Component({
  selector: "app-action-countdown",
  templateUrl: "./action-countdown.component.html",
  styleUrl: "./action-countdown.component.scss",
  standalone: false
})
export class ActionCountdownComponent {

  actionText = "Criez votre cri de guerre !";

  countdownValue = signal<string>("");
  showReady = signal<boolean>(true);
  showConfirmation = signal<boolean>(false);
  cooldown = false;

  constructor(
    private currentTarget: CurrentTargetService,
    private challengeService: ChallengeService,
    private actionService: ActionService,
  ){}

  startCountdown() {
    if (this.cooldown) return;
    this.cooldown = true;
    setTimeout(() => (this.cooldown = false), 1500);

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
    const target = this.currentTarget.getCurrentTarget();
    const currentState = this.currentTarget.getCurrentTargetState();
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
}
