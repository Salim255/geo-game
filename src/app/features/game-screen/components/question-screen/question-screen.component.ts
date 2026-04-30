import { Component } from "@angular/core";

@Component({
  selector: "app-question-screen",
  templateUrl: "./question-screen.component.html",
  styleUrl: "./question-screen.component.scss",
  standalone: false
})
export class QuestionScreenComponent {
  userAnswer: string = '';
  question = "question";

  selectAnswer(option: any){}

  close(){}
  validate() {
  if (!this.userAnswer) {
    console.log('⚠️ No answer provided');
    return;
  }

  console.log('User answer:', this.userAnswer);

  if (this.userAnswer.toLowerCase().includes('silence')) {
    console.log('🎉 Correct answer!');
    this.onSuccess();
  } else {
    console.log('❌ Wrong answer');
  }
}

onSuccess() {
  // close modal + unlock next checkpoint
}
}
