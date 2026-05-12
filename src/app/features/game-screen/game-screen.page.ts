import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { CurrentTargetService } from "./services/currentTarget.service";
import { ChallengeService } from "./services/challenge.service";
import { CurrentActionState, CurrentTargetState, GameChallenge, GameTarget } from "./interfaces/game.interface";
import { ActionService } from "./services/action.service";
import { GpsService } from "./services/gps.service";

@Component({
  selector: "app-game-screen",
  templateUrl: "./game-screen.page.html",
  styleUrl: "./game-screen.page.scss",
  standalone: false
})
export class GameScreenPage implements OnInit, OnDestroy {
  private userActionSubscription!: Subscription;
  private userAnswerSubscription!: Subscription;
  private currentChallengeSubscription!: Subscription;
  private nextTargetSubscription!: Subscription;
  private currentTargetStatSubscription!: Subscription;
  private currentTargetObject = signal<GameTarget | null>(null);

  private currentChallenge = signal<GameChallenge | null>(null);

  constructor(
    private gpsService: GpsService,
    private actionService: ActionService,
    private challengeService: ChallengeService,
    private currentTargetService: CurrentTargetService
  ){}

  ngOnInit(): void {
    this.subscribeToUserAction();
    this.subscribeToCurrentChallenge();
    this.subscribeToTargetStat();
    this.subscribeToNextTarget();
    this.subscribeToUserAnswer();
  }

  subscribeToUserAction(){
    this.userActionSubscription = this.actionService
    .getCurrentActionState$.subscribe((action) => {
      if (action) this.handleUserAction(action);
    })
  }

  subscribeToUserAnswer(){
    this.userAnswerSubscription = this.currentTargetService
    .getUserAnswer$.subscribe((answer: string | null) => {
      if (answer) {
        this.handleUserAnswer();
      }
    })
  }


  subscribeToCurrentChallenge(){
    this.currentChallengeSubscription = this.challengeService
    .getCurrentChallenge$.subscribe((challenge: GameChallenge | null) => {
      this.currentChallenge.set(challenge);
      if(challenge) {
        this.currentTargetHandler(challenge);
      };
    })
  }

  subscribeToNextTarget() {
    this.nextTargetSubscription = this.currentTargetService.getCurrentTarget$.subscribe(target=> {
      if(target){
        this.currentTargetObject.set(target);
        const challenge = this.currentTargetObject()?.challenges[0];
        this.challengeService.setCurrentChallenge(challenge!);
      }
    })
  }

  subscribeToTargetStat(){
    this.currentTargetStatSubscription = this.currentTargetService
    .getCurrentTargetState$.subscribe((state => {
      if (!state || !this.currentTargetObject()) return;
    }))
  }

  handleUserAction(action: CurrentActionState): void{
    const target = this.currentTargetService.getCurrentTarget();
    const state = this.currentTargetService.getCurrentTargetState();
    switch(state?.getTargetId()){
      case 1:
        if (state.getCurrentChallengeIndex() === 0 &&  action.getIsDone()) {
          const nexChallenge = target?.challenges[1];
          if (!nexChallenge) {
            return
          };

          state?.setCurrentChallengeIndex(1);
          this.challengeService.setCurrentChallenge(nexChallenge);
          // To open modal after currently running code
          queueMicrotask(() => {
            this.challengeService.openQuestionDialog();
          });
        }
        return;
      case 2:
        if (state.getCurrentChallengeIndex() === 0 && action.getIsDone()) {
          const chs = this.currentChallenge();
          if(!chs?.actions?.length) return;

          this.actionService.setCurrentActionState(null);

          // To open modal after currently running code
          queueMicrotask(() => {
            this.currentTargetService.openTargetHandlerDialog("puzzle");
          });
        }
        return;
      case 3:
        return;
      case 4:
        if(state.getCurrentChallengeIndex() === 0 && action.getIsDone()){
          const currentChallenge = this.currentTargetObject()?.challenges[1];
          this.challengeService.setCurrentChallenge(currentChallenge!)
          const currentTargeState = new CurrentTargetState();
          currentTargeState.buildFromTarget(this.currentTargetObject()!, 1);
          this.currentTargetService.setCurrentTargetState(currentTargeState);
          queueMicrotask(() => {
            this.currentTargetService.openTargetHandlerDialog('wd-puzzle');
          })
        }
        return;
      case 5:
        if(state.getCurrentChallengeIndex() === 0 && action.getIsDone()){
          const currentChallenge = this.currentTargetObject()?.challenges[1];
          this.challengeService.setCurrentChallenge(currentChallenge!)
          const currentTargeState = new CurrentTargetState();

          currentTargeState.buildFromTarget(this.currentTargetObject()!, 1);
          this.currentTargetService.setCurrentTargetState(currentTargeState);
          this.currentTargetService.openTargetHandlerDialog('question');
        }
        return
      case 6:
        if (action.getIsDone()){
          queueMicrotask(() => {
            this.gpsService.stopTracking();
            this.currentTargetService.openTargetHandlerDialog('epilogue');
          })
        }
        return;
      default:
        return;
    }
  }

  handleUserAnswer(): void{
    const state: CurrentTargetState | null  = this.currentTargetService.getCurrentTargetState();

    if(!state) return;
    const challengeIndex = state.getCurrentChallengeIndex();
    const targetId = state.getTargetId();

    switch(targetId){
      case 1:
        if (challengeIndex === 0) {
          // Set the currentAction state
          const currentChallenge =  this.currentTargetObject()?.challenges[0];
          if(!currentChallenge?.actions) return;
          const currentAction = currentChallenge?.actions[0];

          const currentActionState = new CurrentActionState(0, currentAction, false, false);
          this.actionService.setCurrentActionState(currentActionState);
          this.actionService.openActionModal('countdown');
        }
        return
      case 2:

        return;
      case 3:
        if (challengeIndex === 0){
          const currentChallenge = this.currentTargetObject()?.challenges[1];
          this.challengeService.setCurrentChallenge(currentChallenge!)
          this.currentTargetService.openTargetHandlerDialog('question');


          const currentTargeState = new CurrentTargetState();
          currentTargeState.buildFromTarget(this.currentTargetObject()!, 1);
          this.currentTargetService.setCurrentTargetState(currentTargeState);
        }
        return;
      case 4:
        if(challengeIndex === 0) {
          const challenges = this.currentTargetObject()!.challenges;
          const currentAction = challenges[0]?.actions[0];
          const currentActionState = new CurrentActionState(0, currentAction, true, false);
          this.actionService.setCurrentActionState(currentActionState);
          this.actionService.openActionModal('standard');
        }
        return;
      case 5:
        if (challengeIndex === 0) {
          const currentChallenge = this.currentTargetObject()?.challenges[1];
          const currentTargeState = new CurrentTargetState();
          currentTargeState.buildFromTarget(this.currentTargetObject()!, 1);
          this.currentTargetService.setCurrentTargetState(currentTargeState);
          this.challengeService.setCurrentChallenge(currentChallenge!);
        }
        return;
      case 6:

      default:
        return;
    }
  }

  currentTargetHandler(challenge: GameChallenge): void{
    const state = this.currentTargetService.getCurrentTargetState();

    if (!state) return;

    const challengeIndex = state.getCurrentChallengeIndex();

    let challenges;
    let currentAction;
    let currentActionState;
    switch(this.currentTargetObject()?.id){
      case 1:
        this.currentTargetService.openTargetHandlerDialog('question');
        return;
      case 2:
        challenges = this.currentTargetObject()!.challenges;
        if(!challenges.length) return;
        currentAction = challenges[0]?.actions[0];
        currentActionState = new CurrentActionState(0, currentAction, true, false);
        this.actionService.setCurrentActionState(currentActionState);
        this.actionService.openActionModal('standard');
        return;
      case 3:
        if (challengeIndex === 0){
          this.currentTargetService.openTargetHandlerDialog('question');
        }
        return;
      case 4:
        this.currentTargetService.openTargetHandlerDialog('question');
        return;
      case 5:
        queueMicrotask(() => {
          this.currentTargetService.openTargetHandlerDialog('question');
        })
        return;
      case 6:
        challenges = this.currentTargetObject()!.challenges;
        if(!challenges.length) return;
        currentAction = challenges[0]?.actions[0];
        currentActionState = new CurrentActionState(0, currentAction, true, false);
        this.actionService.setCurrentActionState(currentActionState);
        this.actionService.openActionModal('standard');
        return;
      default:
        return
    }
  }

  ngOnDestroy(): void {
    this.currentTargetStatSubscription?.unsubscribe();
    this.userActionSubscription?.unsubscribe();
    this.userAnswerSubscription?.unsubscribe();
    this.currentChallengeSubscription?.unsubscribe();
    this.nextTargetSubscription?.unsubscribe();
  }
}
