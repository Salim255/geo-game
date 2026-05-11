import { Component, OnInit } from "@angular/core";
import { ActionService } from "../../services/action.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-puzzle-instruction",
  templateUrl: "./puzzle-instruction.component.html",
  styleUrl: "./puzzle-instruction.component.scss",
  standalone: false
})
export class PuzzleInstructionComponent implements OnInit{

  constructor(private actionService: ActionService){}

  ngOnInit(): void {}

  onYes(){
    this.actionService.currentActionIsDone();
    this.actionService.onClose();
  }

  onNo(){}
}

