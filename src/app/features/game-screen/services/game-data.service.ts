import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, switchMap, tap } from "rxjs";
import { NextTargetService } from "./next-target-service";

export interface GameTarget {
  id: number;
  order: number;
  name: string;
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

export interface Introduction {
  paragraphs: string []
}

export interface GameConfig {
  id: string;
  title: string;
  description: string;
  introduction: Introduction;
  targets: GameTarget[];
}

@Injectable({providedIn: "root"})
export class GameDataService{
  private gameDataSubject = new BehaviorSubject<GameConfig | null>(null);

  constructor(
    private http: HttpClient,
    private nextTarget: NextTargetService,
  ) {}

  loadGame(): Observable<GameConfig> {
    return this.http.get<GameConfig>('games/lille-hunt.json').pipe(
      tap((data: GameConfig) => {
        console.log(data);
        this.setGame(data);
      })
    );
  }

  setCurrentTarget(targetId: number): void{
    this.nextTarget.setNextTarget();
  }
  setGame(data: GameConfig) {
    this.gameDataSubject.next(data)
  }

  get getGame$(): Observable< GameConfig  | null> {
    return this.gameDataSubject.asObservable();
  }

  get instruction$(): Observable<string[]>{
    return this.getGame$.pipe(
      map((data: GameConfig | null) => {
        return data?.introduction.paragraphs ?? [];
      }
    )
    )
  }

  getFirstTarget(): GameTarget | null{
      const data: GameConfig | null = this.gameDataSubject.value;
    return  data ? data.targets[0] : null;
  }
  getTargetById(id: number): GameTarget | undefined {
    const data: GameConfig | null = this.gameDataSubject.value;
    return data ? data.targets.find((t:GameTarget) => t.id === id) : undefined;
  }
}
