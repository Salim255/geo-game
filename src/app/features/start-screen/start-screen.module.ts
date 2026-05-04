import { NgModule } from "@angular/core";
import { StartScreenRoutingModule } from "./start-screen-routing.module";
import { StartScreenPage } from "./start-screen.page";
import { IntroductionComponent } from "./components/introduction/introduction.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    FormsModule,
    StartScreenRoutingModule,
  ],
  declarations: [IntroductionComponent, StartScreenPage]
})

export class StartScreenModule {}
