import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { InstructionService } from "../../../features/game-screen/services/instructions.service";
import { ActionService } from "../../../features/game-screen/services/action.service";
import { NextTargetService } from "../../../features/game-screen/services/next-target-service";
import { CurrentTargetService } from "../../../features/game-screen/services/currentTarget.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  standalone: false
})
export class HeaderComponent {

  constructor(
    private currentTargetService: CurrentTargetService,
    private nextTargetService: NextTargetService,
    private actionService: ActionService,
    private instructionService: InstructionService,
    private router: Router,
  ){}

  home(){
    this.router.navigate(["/home"])
  }

  onInstruction(){
    //this.actionService.openActionModal();
    //this.instructionService.openInstructions();
  }

  onRest(){
     setTimeout(() => {
      this.nextTargetService.clearCurrentTarget();
      this.currentTargetService.setCurrentTarget(null);
      this.currentTargetService.onClose();
      this.router.navigate(['/home']);
    }, 1000);
  }
}
