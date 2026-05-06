import { Injectable } from "@angular/core";
import { ActionScreenComponent } from "../components/action-screen/action-screen.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({providedIn: "root"})
export class ActionService {

  constructor(private modalCtr: MatDialog ){}

  openActionModal() {
      this.modalCtr.open(ActionScreenComponent , {
        disableClose: false,
        panelClass: 'dialog-wide',
        maxWidth: "96vw",
        maxHeight: "96vh",
        data: {
          title: 'Action Screen'
        }
      });
    }

    onClose(){
      this.modalCtr.closeAll();
    }
}
