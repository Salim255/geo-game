import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameDataService } from './features/game-screen/services/game-data.service';
import { Subscription } from 'rxjs';
import { CurrentTargetService } from './features/game-screen/services/currentTarget.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private gameDataSubscription!: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private dataService: GameDataService,
  ) {}

  ngOnInit(): void {
    this.dataService.loadGame().subscribe();

     this.snackBar.open('Mauvaise réponse. Essayez encore.', 'OK', {
    duration: 2500,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-toast']
  });

  }

  ngOnDestroy(): void {
    this.gameDataSubscription?.unsubscribe();
  }
}
