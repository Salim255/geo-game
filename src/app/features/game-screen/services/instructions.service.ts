import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class InstructionService {
  private instructionModalSubject = new BehaviorSubject<boolean>(false);

  constructor(){}

  setInstructionModalStatus(status: boolean){
    this.instructionModalSubject.next(status);
  }

  get getInstructionModalStatus():Observable<boolean>{
    return this.instructionModalSubject.asObservable();
  }
}
