import { NgModule } from "@angular/core";
import { HomePage } from "./home.page";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  imports: [HomeRoutingModule],
  declarations: [HomePage]
})
export class HomeModule {}
