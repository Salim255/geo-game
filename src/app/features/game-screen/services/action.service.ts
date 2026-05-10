import { Injectable } from "@angular/core";
import { ActionScreenComponent } from "../components/action-screen/action-screen.component";
import { MatDialog } from "@angular/material/dialog";
import { ActionStandardComponent } from "../components/action-standard/action-standard.component";
import { ComponentType } from "@angular/cdk/overlay";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({providedIn: "root"})
export class ActionService {

  private actionDoneSubject = new BehaviorSubject<'done' | null>(null);

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


  setActionDoneSubject(){

  }

  get getActionDone$(): Observable<'done' | null>{
    return this.actionDoneSubject.asObservable();
  }

  onClose() {
    this.modalCtr.closeAll();
  }
}
