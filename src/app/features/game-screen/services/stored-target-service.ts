import { Injectable } from "@angular/core";
import { GameDataService } from "./game-data.service";


export interface StoredTargetState {
  id: number;
  name: string;
  distance?: number;
  reached: boolean;
  startedAt?: number;
  attempts?: number;
  done: boolean;
  currentActionIndex?: number;
}


@Injectable({providedIn: "root"})
export class StoredTargetService {

  private STORAGE_KEY = 'lille-hunt-current-target';

  constructor(private gameDataService: GameDataService){}
  // Save full object
  setNextTarget(target: StoredTargetState): void {
    this.gameDataService.setCurrentTarget(target.id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ nextTarget: target }));
  }

  // Get object
  getStoredTarget(): StoredTargetState | null {
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
    const current = this.getStoredTarget();
    if (!current) return;

    const updated = {
      ...current,
      reached
    };

    this.setNextTarget(updated);
  }

  getCurrentTargetId(): number {
    const value = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return value.nextTarget?.currentActionIndex || 0;
  }

  clearCurrentTarget(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
