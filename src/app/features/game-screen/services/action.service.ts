import { Injectable } from "@angular/core";
import { ActionScreenComponent } from "../components/action-screen/action-screen.component";
import { MatDialog } from "@angular/material/dialog";
import { ActionStandardComponent } from "../components/action-standard/action-standard.component";
import { ComponentType } from "@angular/cdk/overlay";
import { BehaviorSubject, Observable } from "rxjs";
import { GameAction } from "../interfaces/game.interface";


@Injectable({providedIn: "root"})
export class ActionService {
  private currentActionSubject = new BehaviorSubject<GameAction | null>(null);
  private userActionSubject = new BehaviorSubject<'done' | null>(null);

  constructor(private modalCtr: MatDialog ){}

  openActionModal(type: 'standard' | 'countdown') {
    const component: ComponentType<any> =   type === 'standard'
        ? ActionStandardComponent
        : ActionScreenComponent
    this.modalCtr.open(
      component
        , {
      disableClose: false,
      panelClass: 'dialog-wide',
      maxWidth: "96vw",
      maxHeight: "96vh",
      data: {
        title: 'Action Screen'
      }
    });
  }

  setCurrentAction(action:GameAction | null){
    this.currentActionSubject.next(action);
  }

  setUserActionSubject(done: 'done' | null): void{
    this.userActionSubject.next(done);
  }

  get getCurrentAction$(): Observable<GameAction | null>{
    return this.currentActionSubject.asObservable();
  }
  get getUserAction$(): Observable<'done' | null>{
    return this.userActionSubject.asObservable();
  }

  onClose() {
    this.modalCtr.closeAll();
  }
}
