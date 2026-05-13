import { NgModule } from "@angular/core";
import { ObBoardingRoutingModule } from "./on-boarding-routing.module";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { OnBoardingPage } from "./on-boarding.page";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [OnBoardingPage, HeaderComponent],
  imports: [
    MatSnackBarModule,
    CommonModule,
    ObBoardingRoutingModule,
  ]
})
export class OnBoardingModule {}
