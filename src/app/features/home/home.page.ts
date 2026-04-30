import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrl: "./home.page.scss",
  standalone: false
})
export class HomePage {
  constructor(private router: Router){}
  startGame(){
    this.router.navigate(['/game-screen'])
  }
}
