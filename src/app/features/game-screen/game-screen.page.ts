import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { GameDataService } from "./services/game-data.service";
import { CurrentTargetService } from "./services/currentTarget.service";

@Component({
  selector: "app-game-screen",
  templateUrl: "./game-screen.page.html",
  styleUrl: "./game-screen.page.scss",
  standalone: false
})
export class GameScreenPage implements OnInit, OnDestroy {
  private nextTargetSubscription!: Subscription;
  toPlay = signal<boolean>(false);

  constructor(
    private currentTarget: CurrentTargetService,
    private data: GameDataService
  ) {}

  // 1 We get the target
  // 2 We determine if the target contents
  // 3 We context and its questions
  // 4 We actions
  // 5 set instructions
  // 6 We set its Actions

  ngOnInit() {
    this.subscribeToNextTarget();
  }

  subscribeToNextTarget() {
    this.nextTargetSubscription = this.currentTarget.getCurrentTarget$.subscribe(target=> {
      console.log(target);
    })
  }

  ngOnDestroy(): void {
    this.nextTargetSubscription?.unsubscribe();
  }
}
