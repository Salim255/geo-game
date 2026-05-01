import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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
  targets: GameTarget[];
}

@Injectable({providedIn: "root"})
export class GameDataService{
  private gameDataSubject = new BehaviorSubject<GameConfig | null>(null)
  constructor(private http: HttpClient) {}

  loadGame(): Observable<GameConfig> {
    return this.http.get<GameConfig>('assets/games/lille-hunt.json');
  }

  setGame(data: GameConfig) {
    this.gameDataSubject.next(data)
  }

  get getGame$(): Observable< GameConfig  | null> {
    return this.gameDataSubject.asObservable();
  }

  getTargetById(id: number): GameTarget | undefined {
    const data: GameConfig | null = this.gameDataSubject.value;
    return data ? data.targets.find((t:GameTarget) => t.id === id) : undefined;
  }
}
