import { Component, signal } from "@angular/core";
import { GameDataService } from "../../../game-screen/services/game-data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrl: "./introduction.component.scss",
  standalone: false
})

export class IntroductionComponent {
  introductionSubscription!: Subscription;
  instructions = signal< string[]>([]);
  // STEP MANAGEMENT
  currentStep = signal<'intro' | 'question' | 'action'>('intro');

  // USER INPUT
  warCry = '';

  constructor(private data: GameDataService){}

  ngOnInit(): void {
    this.data.loadGame().subscribe();
    this.subscribeToIntroduction();
  }

  subscribeToIntroduction(){
    this.introductionSubscription = this.data.instruction$.subscribe(data => {
      this.instructions.set(data);
    })
  }


  goToQuestion() {
    this.currentStep.set('question');
  }

  validateWarCry() {
    if (!this.warCry.trim()) return;
    this.currentStep.set('action');
  }

  startGame() {
    // Navigate to next screen
    // this.router.navigate(['/game']);
  }
  ngOnDestroy(): void {
    this.introductionSubscription?.unsubscribe();
  }
}
