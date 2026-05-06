import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameTarget } from "./game-data.service";

export interface NextTargetState {
  id: number;
  name: string;
  distance: number;
  reached: boolean;
}

@Injectable({providedIn: "root"})
export class CurrentTargetService {
  currentTargetSubject = new BehaviorSubject< GameTarget | null>(null);

  private STORAGE_KEY = 'lille-hunt-current-target';

  saveCurrentTargetId(targetId: number): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(targetId));
  }

  getCurrentTargetId(): number | null {
    const value = localStorage.getItem(this.STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  }

  clearCurrentTargetId(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
