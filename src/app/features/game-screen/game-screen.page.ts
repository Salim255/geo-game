import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { GameDataService } from "./services/game-data.service";
import { CurrentTargetService } from "./services/currentTarget.service";
import { ChallengeService } from "./services/challenge.service";
import { GameTarget } from "./interfaces/game.interface";

@Component({
  selector: "app-game-screen",
  templateUrl: "./game-screen.page.html",
  styleUrl: "./game-screen.page.scss",
  standalone: false
})
export class GameScreenPage implements OnInit, OnDestroy {
  private nextTargetSubscription!: Subscription;
  private currentTargetStatSubscription!: Subscription;

  private currentTargetObject = signal<GameTarget | null>(null);
  toPlay = signal<boolean>(false);

  constructor(
    private challengeService: ChallengeService,
    private currentTarget: CurrentTargetService
  ) {}

  // 1 We get the target
  // 2 We determine if the target contents
  // 3 We context and its questions
  // 4 We actions
  // 5 set instructions
  // 6 We set its Actions

  ngOnInit() {
    this.subscribeToNextTarget();
    this.subscribeToTargetStat();
  }

  subscribeToTargetStat(){
    this.currentTargetStatSubscription = this.currentTarget
    .getCurrentTargetState$.subscribe((state => {

      if (!state || !this.currentTargetObject()) return;


      const challengeIndex = state.getCurrentChallengeIndex();

      if(challengeIndex === undefined) return;

      const challenge = this.currentTargetObject()?.challenges[challengeIndex];

      console.log(this.currentTargetObject(), challenge, "hello")
      if(!challenge) return;

      console.log(challenge, "Hello from challenge");
      this.challengeService.setCurrentChallenge(challenge);

      // Open Question
      // Close
      this.challengeService.onClose();
      setTimeout(() => {
        this.challengeService.openQuestionDialog();
      }, 0)
    }))
  }

  subscribeToNextTarget() {
    this.nextTargetSubscription = this.currentTarget.getCurrentTarget$.subscribe(target=> {
      this.currentTargetObject.set(target);
    })
  }

  ngOnDestroy(): void {
    this.nextTargetSubscription?.unsubscribe();
    this.currentTargetStatSubscription?.unsubscribe();
  }
}
