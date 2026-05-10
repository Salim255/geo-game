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

  targetId = signal<number | null>(null);

  action = signal<GameAction | null>(null);

  // Optional: track if user validated the action
  context = signal<string []>([]);

  private isLastAction = signal<boolean>(false);

  constructor(
    private actionService: ActionService,
    private challengeService: ChallengeService,
  ){}

  ngOnInit(): void {
    this.subscribeToCurrentAction();
  }

  subscribeToCurrentAction(){
    this.currentActionSubscription = this.actionService
    .getCurrentAction$.subscribe((action: {action: GameAction, context: string[]}  | null) => {
      console.log(action);
      if (action)
      this.action.set(action?.action);
      this.context.set(action?.context ?? [])
    })
  }


  confirm() {
    this.actionService.setUserActionSubject('done');
    this.actionService.onClose();
  }

  ngOnDestroy(): void {
    this.currentActionSubscription?.unsubscribe();
    this.currentChallengeSubscription?.unsubscribe();
  }
}

