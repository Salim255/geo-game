import { Component, signal } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-epilogue",
  templateUrl: "./epilogue-screen.component.html",
  styleUrl: "./epilogue-screen.component.scss",
  standalone: false
})
export class EpilogueScreenComponent {

  isClosing =signal<boolean>(false);

  constructor(private router: Router){}

  onFinalPhraseClick() {
    this.isClosing.set(true);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000); // 1 seconde
  }
}
