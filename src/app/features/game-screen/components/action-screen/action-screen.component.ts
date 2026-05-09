import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";
import { GameTarget } from "../../interfaces/game.interface";

export enum ActionType {
  STANDARD='standard',
  COUNTDOWN='countdown'
}

@Component({
  selector: "app-action-screen",
  templateUrl: "./action-screen.component.html",
  styleUrls: ["./action-screen.component.scss"],
  standalone: false
})
export class ActionScreenComponent implements OnInit, OnDestroy {
  private currentTargetSubscription!: Subscription;
  private currentTarget: GameTarget | null = null;
  currentActionType = signal<ActionType | null>(null);
  actionType=ActionType;

  constructor(private currentTargetService: CurrentTargetService ){}

  ngOnInit(): void {
    this.subscribeToCurrentTarget();
  }

  subscribeToCurrentTarget() {
    this.currentTargetSubscription = this.currentTargetService
    .getCurrentTarget$.subscribe(target => {
      this.currentTarget = target;
      if(target) {
        console.log(target);
        if (target.id === 1) {
          this.currentActionType.set(this.actionType.COUNTDOWN);
        }
        if (target.id === 2) {
          this.currentActionType.set(this.actionType.STANDARD);
        }

        this.currentTarget = target;
      }
    })
  }

  ngOnDestroy(): void {
    this.currentTargetSubscription?.unsubscribe();
  }

}
