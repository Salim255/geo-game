import { Component, signal } from "@angular/core";
import { GameDataService } from "../../../game-screen/services/game-data.service";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrl: "./introduction.component.scss",
  standalone: false
})

export class IntroductionComponent {
  instructions = signal< string[]>([]);
  constructor(private data: GameDataService){
    this.instructions.set(data)
  }
}
