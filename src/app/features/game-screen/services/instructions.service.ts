import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { InstructionsComponent } from "../components/instructions/instructions.component";

@Injectable({providedIn: "root"})
export class InstructionService {
  private instructionModalSubject = new BehaviorSubject<boolean>(false);

  constructor(private modalCtr: MatDialog ){}

  setInstructionModalStatus(status: boolean){
    this.instructionModalSubject.next(status);
  }

  get getInstructionModalStatus():Observable<boolean>{
    return this.instructionModalSubject.asObservable();
  }

  openInstructions() {
    this.modalCtr.open(InstructionsComponent, {
      disableClose: false,
      data: {
        title: 'Game Instructions'
      }
    });
  }
}
