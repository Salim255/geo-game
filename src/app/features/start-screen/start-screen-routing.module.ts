import { RouterModule, Routes } from "@angular/router";
import { StartScreenPage } from "./start-screen.page";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: StartScreenPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StartScreenRoutingModule {}
