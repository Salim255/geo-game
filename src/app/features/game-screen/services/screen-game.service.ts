import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { QuestionScreenComponent } from "../components/question-screen/question-screen.component";

@Injectable({providedIn: "root"})
export class ScreenGameService {

  constructor(private modalCtr:  MatDialog ){}
   openInstructions() {
      this.modalCtr.open(QuestionScreenComponent, {
        disableClose: true,
        data: {
          title: 'Game Instructions'
        }
      });
    }
}
