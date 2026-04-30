import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: "root"})
export class InstructionService {
  private instructionModalSubject = new BehaviorSubject<boolean>(false);

  constructor(){}

  setInstructionModalStatus(status: boolean){
    this.instructionModalSubject.next(status);
  }
}
