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
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ObBoardingRoutingModule{}
