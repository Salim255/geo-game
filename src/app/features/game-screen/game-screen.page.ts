import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { CurrentTargetService } from "./services/currentTarget.service";
import { ChallengeService } from "./services/challenge.service";
import { CurrentTargetState, GameChallenge, GameTarget } from "./interfaces/game.interface";
import { ActionService } from "./services/action.service";

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

  constructor(
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
    this.userActionSubscription = this.actionService.getUserAction$.subscribe((action) => {
      console.log(action);
      this.handleUserAction();
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
    .getCurrentChallenge$.subscribe((challenge) => {
      if(challenge) this.challengeHandler(challenge);
    })
  }

  subscribeToNextTarget() {
    this.nextTargetSubscription = this.currentTargetService.getCurrentTarget$.subscribe(target=> {
      if(!target){
      // this.currentTargetService.onClose();
      }
      this.currentTargetObject.set(target);
    })
  }

  subscribeToTargetStat(){
    this.currentTargetStatSubscription = this.currentTargetService
    .getCurrentTargetState$.subscribe((state => {

      console.log(state, "hello from state 👹👹");

      if (!state || !this.currentTargetObject()) return;


      //const challengeIndex = state.getCurrentChallengeIndex();

      //if(challengeIndex === undefined) return;

      //const challenge = this.currentTargetObject()?.challenges[challengeIndex];

      //if(!challenge) return;

      //console.log(challenge, "Hello from challenge");
      //this.challengeService.setCurrentChallenge(challenge);

      // Open Question
      // Close
      this.challengeService.onClose();
      setTimeout(() => {


        //this.challengeService.openQuestionDialog();
        //this.brainService.screenDeterminer(this.currentTargetObject()?.id!)
      }, 0)
    }))
  }

  handleUserAction(): void{
    console.log("Hello from user action, 👹👹✅✅")
  }

  handleUserAnswer(): void{
    const state: CurrentTargetState | null  = this.currentTargetService.getCurrentTargetState();

    if(!state) return;
    const challengeIndex = state.getCurrentChallengeIndex();
    const targetId = state.getTargetId();
    const actionIndex = state.getCurrentActionIndex();

    switch(targetId){
      case 1:
        if(challengeIndex === 0){
          this.actionService.openActionModal('countdown');
        }
        return
      case 2:
          //alert("TargetId: "+ `${state.getTargetId()}`)
          return;
      case 3:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 4:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 5:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 6:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 7:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      default:
    }
  }

  challengeHandler(challenge: GameChallenge): void{
    const state = this.currentTargetService.getCurrentTargetState();

    if (!state) return;

    const challengeIndex = state.getCurrentChallengeIndex();

    switch(state.getTargetId()){
      case 1:
        // challenge 1
        // a Question
        if (challengeIndex  === 0) {
          this.challengeService.openQuestionDialog();
        }

        if (challengeIndex  === 1 ) {
        // alert("Hello from "+ `${challengeIndex}`)
          //this.challengeService.openQuestionDialog();
        }

        // challenge 2
        // Countdown with
        return
      case 2:
          //alert("TargetId: "+ `${state.getTargetId()}`)
          return;
      case 3:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 4:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 5:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 6:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      case 7:
          //alert("TargetId: "+ `${state.getTargetId()}`)
        return;
      default:
        this.actionService.openActionModal('countdown');
    }
  }


  ngOnDestroy(): void {
    console.log("Destroyed")
    this.currentTargetStatSubscription?.unsubscribe();
    this.userActionSubscription?.unsubscribe();
    this.userAnswerSubscription?.unsubscribe();
    this.currentChallengeSubscription?.unsubscribe();
    this.nextTargetSubscription?.unsubscribe();
  }
}
