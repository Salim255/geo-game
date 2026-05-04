import { NgModule } from "@angular/core";
import { StartScreenRoutingModule } from "./start-screen-routing.module";
import { StartScreenPage } from "./start-screen.page";
import { IntroductionComponent } from "./components/introduction/introduction.component";

@NgModule({
  imports: [StartScreenRoutingModule],
  declarations: [IntroductionComponent, StartScreenPage]
})

export class StartScreenModule {}
