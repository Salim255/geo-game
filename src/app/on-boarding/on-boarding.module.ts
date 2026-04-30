import { NgModule } from "@angular/core";
import { ObBoardingRoutingModule } from "./on-boarding-routing.module";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ObBoardingRoutingModule,
  ]
})
export class OnBoardingModule {}
