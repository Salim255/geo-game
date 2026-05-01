import { Injectable } from "@angular/core";
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

@Injectable({providedIn: "root"})
export class GameDataService{}
