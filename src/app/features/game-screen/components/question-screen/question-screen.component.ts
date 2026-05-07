import { Component, OnInit } from "@angular/core";
import { CurrentTargetService } from "../../services/currentTarget.service";
import { Subscription } from "rxjs";
import { GameTarget } from "../../interfaces/game.interface";

@Component({
  selector: "app-question-screen",
  templateUrl: "./question-screen.component.html",
  styleUrl: "./question-screen.component.scss",
  standalone: false
})
export class QuestionScreenComponent implements OnInit {
  private currentTargetSubscription!: Subscription;
  private currentTarget: GameTarget | null = null;
  userAnswer: string = '';
  question = "question";

  constructor(private currentTargetService: CurrentTargetService){}


  ngOnInit(): void { }
  selectAnswer(option: any){}

  subscribeToCurrentTarget() {
    this.currentTargetSubscription = this.currentTargetService
    .getCurrentTarget$.subscribe(target => {
      this.currentTarget = target;
      if(target) {
        console.log(target);
        this.currentTarget = target;
      }
    })
  }


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
