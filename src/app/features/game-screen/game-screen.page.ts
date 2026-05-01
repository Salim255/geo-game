import { Component, OnInit, signal } from "@angular/core";

@Component({
  selector: "app-game-screen",
  templateUrl: "./game-screen.page.html",
  styleUrl: "./game-screen.page.scss",
  standalone: false
})
export class GameScreenPage implements OnInit {
  toPlay = signal<boolean>(false);
  constructor() {}
  ngOnInit() {}
}
