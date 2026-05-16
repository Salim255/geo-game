import { Component, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { ChallengeService } from "../../services/challenge.service";
import { Subscription } from "rxjs";
import { GameChallenge } from "../../interfaces/game.interface";
import { StoredTargetService } from "../../services/stored-target-service";

@Component({
  selector: "app-epilogue",
  templateUrl: "./epilogue-screen.component.html",
  styleUrl: "./epilogue-screen.component.scss",
  standalone: false
})
export class EpilogueScreenComponent implements OnInit {
  private currentChallengeSubscription!: Subscription;
  isClosing = signal<boolean>(false);

  currentChallenge = signal<GameChallenge | null>(null);

  constructor(
    private storedTargetService: StoredTargetService,
    private challengeService: ChallengeService,
    private currentTargetService: CurrentTargetService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.subscribeToCurrentChallenge();
  }
  subscribeToCurrentChallenge(){
    this.currentChallengeSubscription = this.challengeService
    .getCurrentChallenge$.subscribe((challenge: GameChallenge | null) => {
      this.currentChallenge.set(challenge);
    })
  }

  onFinalPhraseClick() {
    this.isClosing.set(true);

    setTimeout(() => {
      this.storedTargetService.clearCurrentTarget();
      this.currentTargetService.setCurrentTarget(null);
      this.currentTargetService.onClose();
      this.router.navigate(['/home']);
    }, 1000);
  }

  ngOnDestroy(): void {

    this.currentChallengeSubscription?.unsubscribe();
  }
}
