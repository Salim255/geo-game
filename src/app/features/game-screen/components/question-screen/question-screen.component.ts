import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";
import { CurrentTargetState, GameChallenge } from "../../interfaces/game.interface";
import { ChallengeService } from "../../services/challenge.service";
import { ActionService } from "../../services/action.service";
import { GameDataService } from "../../services/game-data.service";

@Component({
  selector: "app-question-screen",
  templateUrl: "./question-screen.component.html",
  styleUrl: "./question-screen.component.scss",
  standalone: false
})
export class QuestionScreenComponent implements OnInit {
  ngOnInit(): void {}

}
