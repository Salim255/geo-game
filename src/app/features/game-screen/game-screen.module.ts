import { NgModule } from "@angular/core";
import { GameScreenRoutingModule } from "./game-screen-routing.module";
import { InstructionsComponent } from "./components/instructions/instructions.component";
import { GameScreenPage } from "./game-screen.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MapComponent } from "./components/map/map.component";
import { QuestionScreenComponent } from "./components/question-screen/question-screen.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
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
