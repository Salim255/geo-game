import { RouterModule, Routes } from "@angular/router";
import { OnBoardingPage } from "./on-boarding.page";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: OnBoardingPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ObBoardingRoutingModule{}
