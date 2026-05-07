import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-acton-standard',
  templateUrl: './action-standard.component.html',
  styleUrl: "./action-standard.component.scss",
  standalone: false
})

export class ActionStandardComponent implements OnInit {
 // The action object (acheter, photo, etc.)
  @Input() action: any;

  // Optional: track if user validated the action
  validated = signal<boolean>(false);

  ngOnInit(): void {

  }
  confirm() {
    this.validated.set(true);
    console.log("Action simple validée → étape suivante");
    // Here you can close the modal or notify parent if needed
  }
}

