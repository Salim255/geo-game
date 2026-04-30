import { RouterModule, Routes } from "@angular/router";
import { GameScreenPage } from "./game-screen.page";
import { NgModule } from "@angular/core";

const routes: Routes = [{
  path: "",
  component: GameScreenPage
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameScreenRoutingModule {}
