import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GameDataService } from './features/game-screen/services/game-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private gameDataSubscription!: Subscription;

  constructor(
    private router: Router,
    private dataService: GameDataService,
  ) {}

  ngOnInit(): void {
    this.dataService.loadGame().subscribe();
  }

  @HostListener('window:beforeunload', ['$event'])
    handleBeforeUnload(event: BeforeUnloadEvent) {

      if (this.router.url.startsWith('/home')) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
  }

  ngOnDestroy(): void {
    this.gameDataSubscription?.unsubscribe();
  }
}
