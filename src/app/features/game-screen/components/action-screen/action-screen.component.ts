import { Component, OnInit, signal } from "@angular/core";

export enum ActionType {
  STANDARD='standard',
  COUNTDOWN='countdown'
}

@Component({
  selector: "app-action-screen",
  templateUrl: "./action-screen.component.html",
  styleUrls: ["./action-screen.component.scss"],
  standalone: false
})
export class ActionScreenComponent implements OnInit {

  currentActionType = signal<ActionType | null>(null);

  actionType=ActionType;

  constructor(){}

  ngOnInit(): void {}

}
