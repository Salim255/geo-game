import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { ActionService } from "../../services/action.service";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";
import { CurrentActionState } from "../../interfaces/game.interface";

@Component({
  selector: "app-action-countdown",
  templateUrl: "./action-countdown.component.html",
  styleUrl: "./action-countdown.component.scss",
  standalone: false
})
export class ActionCountdownComponent implements OnInit, OnDestroy {
  private currentActionSubscription!: Subscription;
  private userAnserSubscription!: Subscription;
  actionText = "Criez votre cri de guerre !";

  countdownValue = signal<string>("");
  showReady = signal<boolean>(true);
  showConfirmation = signal<boolean>(false);
  coolDown = false;

  userAnswer = signal<string| null>(null);

  private currentActionState = signal<CurrentActionState | null>(null);

  constructor(
    private currentTargetService: CurrentTargetService,
    private actionService: ActionService,
  ){}

  ngOnInit(): void {
    this.subscribeToUserAnser();
    this.subscribeToUserAction();
  }

  private subscribeToUserAction(){
    this.currentActionSubscription = this.actionService
    .getCurrentActionState$.subscribe((action) => {
      this.currentActionState.set(action);
    })
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
    const currentAction = new CurrentActionState(
      this.currentActionState()?.getActionIndex()!,
      this.currentActionState()?.getAction()!,
      this.currentActionState()?.getIsLast()!,
      true
    );

    this.actionService.setCurrentActionState(currentAction);
    // Close current modal
    this.actionService.onClose();
  }

  retry() {
    this.showConfirmation.set(false);
    this.showReady.set(true);
    this.countdownValue.set("");
  }

  ngOnDestroy(): void {
    this.currentActionSubscription?.unsubscribe();
    this.userAnserSubscription?.unsubscribe();
  }
}
