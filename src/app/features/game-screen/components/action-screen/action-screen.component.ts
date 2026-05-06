import { Component, signal } from "@angular/core";

@Component({
  selector: "app-action-screen",
  templateUrl: "./action-screen.component.html",
  styleUrls: ["./action-screen.component.scss"],
  standalone: false
})
export class ActionScreenComponent {

  actionText = "Criez votre cri de guerre !";

  countdownValue = signal<string>("");        // 👈 FIXED
  showReady = signal<boolean>(true);          // OK
  showConfirmation = signal<boolean>(false);  // 👈 FIXED
  cooldown = false;

  startCountdown() {
    if (this.cooldown) return;
    this.cooldown = true;
    setTimeout(() => (this.cooldown = false), 1500);

    this.showReady.set(false);
    this.countdownValue.set("");

    const steps = ["3", "2", "1", "GO !"];
    let i = 0;

    const interval = setInterval(() => {
      this.countdownValue.set(steps[i]);   // 👈 SIGNAL UPDATE
      i++;

      if (i === steps.length) {
        clearInterval(interval);

        setTimeout(() => {
          this.showConfirmation.set(true); // 👈 SIGNAL UPDATE
        }, 700);
      }
    }, 1000);
  }

  confirmSuccess() {
    console.log("Action validée → étape suivante");
  }

  retry() {
    this.showConfirmation.set(false);
    this.showReady.set(true);
    this.countdownValue.set("");
  }
}
