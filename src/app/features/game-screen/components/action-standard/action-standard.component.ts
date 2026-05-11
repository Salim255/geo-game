import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ChallengeAction, CurrentActionState } from '../../interfaces/game.interface';
import { Subscription } from 'rxjs';
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
  private currentAction = signal<CurrentActionState | null>(null);

  constructor(private actionService: ActionService){}

  ngOnInit(): void {
    this.subscribeToCurrentAction();
  }

  subscribeToCurrentAction(){
    this.currentActionSubscription = this.actionService
    .getCurrentActionState$.subscribe((action: CurrentActionState  | null) => {
      if (action)
      this.action.set(action.getAction());
      this.currentAction.set(action);
    });

  }


  confirm() {
    if(this.currentAction()){
      const currentActionState = this.currentAction();
      currentActionState?.setIsDone();
      this.actionService.setCurrentActionState(currentActionState);
    }
    this.actionService.onClose();
  }

  ngOnDestroy(): void {
    this.currentActionSubscription?.unsubscribe();
  }
}

