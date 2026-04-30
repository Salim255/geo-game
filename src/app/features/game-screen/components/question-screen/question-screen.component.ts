import { Component } from "@angular/core";

@Component({
  selector: "app-question-screen",
  templateUrl: "./question-screen.component.html",
  styleUrl: "./question-screen.component.scss",
  standalone: false
})
export class QuestionScreenComponent {
  question = "question";

  selectAnswer(option: any){}

  close(){}
  validate(){}
}
