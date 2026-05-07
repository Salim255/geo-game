import { Component, signal } from "@angular/core";
import { GameDataService } from "../../../game-screen/services/game-data.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { NextTargetService, NextTargetState } from "../../../game-screen/services/next-target-service";
import { GameTarget } from "../../../game-screen/interfaces/game.interface";
import { CurrentTargetService } from "../../../game-screen/services/currentTarget.service";

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
    private currentTargetService: CurrentTargetService,
    private router: Router,
    private data: GameDataService,
    private nextTargetService: NextTargetService,
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
    const firstTarget: GameTarget | null  =  this.data.getFirstTarget();
    if (!firstTarget) return;
    const nextTarget: NextTargetState = {
      id: firstTarget.id,
      name: firstTarget.name,
      reached: true,
      currentActionIndex: 0
     };
    this.nextTargetService.setNextTarget(nextTarget);
    this.router.navigate(['/game-screen']);
  }

  ngOnDestroy(): void {
    this.introductionSubscription?.unsubscribe();
  }
}
