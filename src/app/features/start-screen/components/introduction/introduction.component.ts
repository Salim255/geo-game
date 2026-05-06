import { Component, signal } from "@angular/core";
import { GameDataService } from "../../../game-screen/services/game-data.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CurrentTargetService } from "../../../game-screen/services/current-target-service";

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

  constructor(
    private router: Router,
    private data: GameDataService,
    private currentTargetService: CurrentTargetService,
  ){}

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
    this. currentTargetService.saveCurrentTargetId(1);
    this.router.navigate(['/game-screen']);
  }
  ngOnDestroy(): void {
    this.introductionSubscription?.unsubscribe();
  }
}
