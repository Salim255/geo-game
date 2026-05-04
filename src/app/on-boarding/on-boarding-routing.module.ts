import { RouterModule, Routes } from "@angular/router";
import { OnBoardingPage } from "./on-boarding.page";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: OnBoardingPage,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        loadChildren: () => import("../features/home/home.module").then(m => m.HomeModule)
      },
      {
        path: "start-screen",
        loadChildren: () => import("../features/start-screen/start-screen.module").then(m => m.StartScreenModule)
      },
      {
        path: "game-screen",
        loadChildren: () => import("../features/game-screen/game-screen.module")
        .then(m => m.GameScreenModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ObBoardingRoutingModule{}
