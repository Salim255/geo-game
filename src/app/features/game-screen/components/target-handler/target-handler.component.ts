import { Component } from "@angular/core";
import { ActionService } from "../../services/action.service";
import { ChallengeService } from "../../services/challenge.service";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-target-handler",
  templateUrl: "./target-handler.component.html",
  styleUrl: "./target-handler.component.scss",
  standalone: false
})
export class TargetHandlerComponent {
  private nextTargetSubscription!: Subscription;
  private currentTargetStatSubscription!: Subscription;

  constructor(
    private actionService: ActionService,
    private challengeService: ChallengeService,
    private currentTarget: CurrentTargetService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscribeToTargetStat();
    this.subscribeToNextTarget();
  }

   subscribeToNextTarget() {
    this.nextTargetSubscription = this.currentTarget.getCurrentTarget$.subscribe(target=> {
      this.currentTargetObject.set(target);
    })
  }

  subscribeToTargetStat(){
    this.currentTargetStatSubscription = this.currentTarget
    .getCurrentTargetState$.subscribe((state => {

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
        switch(state.getTargetId()){
          case 1:
           // alert("TargetId: "+ `${state.getTargetId()}`)

            // 1 question component with
            // 2 Will see action component
            //this.actionService.openActionModal('countdown');
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

        //this.challengeService.openQuestionDialog();
        //this.brainService.screenDeterminer(this.currentTargetObject()?.id!)
      }, 0)
    }))
  }
}
