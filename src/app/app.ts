import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameDataService } from './features/game-screen/services/game-data.service';
import { Subscription } from 'rxjs';
import { CurrentTargetService } from './features/game-screen/services/currentTarget.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private gameDataSubscription!: Subscription;

  constructor(
    private dataService: GameDataService,
  ) {}

  ngOnInit(): void {
    this.dataService.loadGame().subscribe();
  }

  ngOnDestroy(): void {
    this.gameDataSubscription?.unsubscribe();
  }
}
