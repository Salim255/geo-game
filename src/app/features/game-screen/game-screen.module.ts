import { NgModule } from "@angular/core";
import { GameScreenRoutingModule } from "./game-screen-routing.module";
import { InstructionsComponent } from "./components/instructions/instructions.component";
import { GameScreenPage } from "./game-screen.page";
import { CommonModule } from "@angular/common";
import { MapComponent } from "./components/map/map.component";

@NgModule({
  declarations: [
    MapComponent,
    InstructionsComponent,
    GameScreenPage
  ],
  imports: [
    CommonModule,
    GameScreenRoutingModule]
})
export class GameScreenModule {}
