import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ChallengeAction, CurrentActionState, GameChallenge } from '../../interfaces/game.interface';
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
  private currentActionSubscription!: Subscription;

  action = signal<ChallengeAction | null>(null);

  constructor(
    private actionService: ActionService,
  ){}

  ngOnInit(): void {
    this.subscribeToCurrentAction();
  }

  subscribeToCurrentAction(){
    this.currentActionSubscription = this.actionService
    .getCurrentActionState$.subscribe((action: CurrentActionState  | null) => {
      if (action)
      this.action.set(action.getAction());
    })
  }


  confirm() {
    //this.actionService.setUserActionSubject('done');
    this.actionService.onClose();
  }

  ngOnDestroy(): void {
    this.currentActionSubscription?.unsubscribe();
  }
}

