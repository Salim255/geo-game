import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
  private game!: GameConfig;
  constructor(private http: HttpClient) {}

  loadGame(): Observable<GameConfig> {
    return this.http.get<GameConfig>('assets/games/lille-hunt.json');
  }
}
