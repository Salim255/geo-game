import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { GameAction, GameChallenge } from '../../interfaces/game.interface';
import { Subscription } from 'rxjs';
import { ChallengeService } from '../../services/challenge.service';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-acton-standard',
  templateUrl: './action-standard.component.html',
  styleUrl: "./action-standard.component.scss",
  standalone: false
})

export class ActionStandardComponent implements OnInit, OnDestroy {
  private currentChallengeSubscription!: Subscription;
  private currentActionSubscription!: Subscription;

  currentChallenge = signal<GameChallenge | null>(null);
  userAnswer: string = '';
  question = "question";

  targetId = signal<number | null>(null);
  // The action object (acheter, photo, etc.)
  @Input() action: any;

  // Optional: track if user validated the action
  validated = signal<boolean>(false);

  constructor(
    private actionService: ActionService,
    private challengeService: ChallengeService,
  ){}

  ngOnInit(): void {
    this.subscribeToCurrentAction();
  }

  subscribeToCurrentAction(){
    this.currentActionSubscription = this.actionService
    .getCurrentAction$.subscribe((action: GameAction | null) => {
      console.log(action);
    })
  }

  subscribeToCurrentChallenge() {
    this.currentChallengeSubscription = this.challengeService
    .getCurrentChallenge$.subscribe((challenge: GameChallenge | null) => {
      this.currentChallenge.set(challenge);
      if (!challenge?.actions) return;
      this.action = challenge?.actions[0];
    })
  }

  confirm() {
    this.validated.set(true);
    console.log("Action simple validée → étape suivante");
    // Here you can close the modal or notify parent if needed
  }

  ngOnDestroy(): void {
    this.currentActionSubscription?.unsubscribe();
    this.currentChallengeSubscription?.unsubscribe();
  }
}

