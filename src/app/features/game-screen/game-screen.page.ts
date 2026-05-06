import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { GameDataService } from "./services/game-data.service";

@Component({
  selector: "app-game-screen",
  templateUrl: "./game-screen.page.html",
  styleUrl: "./game-screen.page.scss",
  standalone: false
})
export class GameScreenPage implements OnInit, OnDestroy {
  private nextTargetSubscription!: Subscription;
  toPlay = signal<boolean>(false);

  constructor(private data: GameDataService) {}

  ngOnInit() {}

  ngOnDestroy(): void {

  }
}
