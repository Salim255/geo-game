import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

export interface GameTarget {
  id: number;
  order: number;
  location: {
    lat: number;
    lng: number;
    radius: number;
  };
  story: any;
  question: any;
  success: any;
  failure: any;
  nextTargetId: number | null;
}

export interface GameConfig {
  id: string;
  title: string;
  description: string;
  introductions: string[];
  targets: GameTarget[];
}

@Injectable({providedIn: "root"})
export class GameDataService{
  private gameDataSubject = new BehaviorSubject<GameConfig | null>(null)
  constructor(private http: HttpClient) {}

  loadGame(): Observable<GameConfig> {
    return this.http.get<GameConfig>('games/lille-hunt.json').pipe(
      tap((data: GameConfig) => {
        console.log(data);
        this.setGame(data);
      })
    );
  }

  setGame(data: GameConfig) {
    this.gameDataSubject.next(data)
  }

  get getGame$(): Observable< GameConfig  | null> {
    return this.gameDataSubject.asObservable();
  }

  getIntroductionsData(): string []{
    return this.gameDataSubject.value?.introductions ?? [];
  }

  getTargetById(id: number): GameTarget | undefined {
    const data: GameConfig | null = this.gameDataSubject.value;
    return data ? data.targets.find((t:GameTarget) => t.id === id) : undefined;
  }
}
