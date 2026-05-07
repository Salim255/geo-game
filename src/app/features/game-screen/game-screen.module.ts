import { NgModule } from "@angular/core";
import { GameScreenRoutingModule } from "./game-screen-routing.module";
import { InstructionsComponent } from "./components/instructions/instructions.component";
import { GameScreenPage } from "./game-screen.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MapComponent } from "./components/map/map.component";
import { QuestionScreenComponent } from "./components/question-screen/question-screen.component";
import { SharedModule } from "../../shared/shared.module";
import { ActionScreenComponent } from "./components/action-screen/action-screen.component";
import { ActionCountdownComponent } from "./components/action-countdown/action-countdown.component";
import { ActionStandardComponent } from "./components/action-standard/action-standard.component";
import { PuzzleInstructionComponent } from "./components/puzzle-instruction/puzzle-instruction.component";

@NgModule({
  declarations: [
    PuzzleInstructionComponent,
    ActionStandardComponent,
    ActionCountdownComponent,
    ActionScreenComponent,
    QuestionScreenComponent,
    MapComponent,
    InstructionsComponent,
    GameScreenPage
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    GameScreenRoutingModule,
  ]
})
export class GameScreenModule {}
