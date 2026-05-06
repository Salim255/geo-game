import { Component } from "@angular/core";
import { InstructionService } from "../../services/instructions.service";

@Component({
  selector: "app-instructions",
  templateUrl: "./instructions.component.html",
  styleUrl: "./instructions.component.scss",
  standalone: false
})
export class InstructionsComponent {
  constructor(private inst: InstructionService){}

  onClose(){
    this.inst.onClose();
  }
}
