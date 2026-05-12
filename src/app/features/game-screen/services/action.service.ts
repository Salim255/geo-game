import { Injectable } from "@angular/core";
import { ActionScreenComponent } from "../components/action-screen/action-screen.component";
import { MatDialog } from "@angular/material/dialog";
import { ActionStandardComponent } from "../components/action-standard/action-standard.component";
import { ComponentType } from "@angular/cdk/overlay";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentActionState } from "../interfaces/game.interface";


@Injectable({providedIn: "root"})
export class ActionService {
  private currentActionStateSubject = new BehaviorSubject<CurrentActionState | null>(null);

  constructor(private modalCtr: MatDialog ){}

  openActionModal(type: 'standard' | 'countdown') {
    const component: ComponentType<any> =   type === 'standard'
        ? ActionStandardComponent
        : ActionScreenComponent;

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

  setCurrentActionState(action: CurrentActionState  | null){
    this.currentActionStateSubject.next(action);
  }

  currentActionIsDone(){
    const currentActionState = this.currentActionStateSubject.value;
    currentActionState?.setIsDone();
    this.setCurrentActionState(currentActionState);
  }


  get getCurrentActionState$(): Observable<CurrentActionState  | null>{
    return this.currentActionStateSubject.asObservable();
  }
  onClose() {
    this.modalCtr.closeAll();
  }
}
