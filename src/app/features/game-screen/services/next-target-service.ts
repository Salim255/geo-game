import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameDataService, GameTarget } from "./game-data.service";

export interface NextTargetState {
  id: number;
  name: string;
  distance?: number;
  reached: boolean;
  startedAt?: number;
  attempts?: number;
}

@Injectable({providedIn: "root"})
export class NextTargetService {
  private currentTargetSubject = new BehaviorSubject< GameTarget | null>(null);

  private STORAGE_KEY = 'lille-hunt-current-target';

  constructor(private gameDataService: GameDataService){}
  // Save full object
  setNextTarget(target: NextTargetState): void {
    this.gameDataService.setCurrentTarget(target.id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ nextTarget: target }));
  }

  // Get object
  getNextTarget(): NextTargetState | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;

    try {
      return JSON.parse(data).nextTarget;
    } catch {
      return null;
    }
  }

  // Update only reached status
  setTargetReached(reached: boolean): void {
    const current = this.getNextTarget();
    if (!current) return;

    const updated = {
      ...current,
      reached
    };

    this.setNextTarget(updated);
  }

  getCurrentTargetId(): number | null {
    const value = localStorage.getItem(this.STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  }

  clearCurrentTargetId(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
