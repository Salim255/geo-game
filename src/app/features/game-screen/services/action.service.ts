import { Injectable } from "@angular/core";
import { ActionScreenComponent } from "../components/action-screen/action-screen.component";
import { MatDialog } from "@angular/material/dialog";
import { ActionStandardComponent } from "../components/action-standard/action-standard.component";
import { ComponentType } from "@angular/cdk/overlay";


@Injectable({providedIn: "root"})
export class ActionService {

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

  onClose() {
    this.modalCtr.closeAll();
  }
}
