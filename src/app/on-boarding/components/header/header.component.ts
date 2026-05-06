import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { InstructionService } from "../../../features/game-screen/services/instructions.service";
import { ActionService } from "../../../features/game-screen/services/action.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  standalone: false
})
export class HeaderComponent {

  constructor(
    private actionService: ActionService,
    private instructionService: InstructionService,
    private router: Router,
  ){}

  home(){
    this.router.navigate(["/home"])
  }

  onInstruction(){
    this.actionService.openActionModal();
    //this.instructionService.openInstructions();
  }
}
