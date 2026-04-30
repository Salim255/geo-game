import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./on-boarding/on-boarding.module").then((m) => m.OnBoardingModule)
  }
];
