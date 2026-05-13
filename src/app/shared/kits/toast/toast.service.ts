import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2500,
      horizontalPosition: "center",
      verticalPosition: "top",

      panelClass: ["toast-success"]
    });
  }

  error(message: string) {
    this.snackBar.open(message, "Réessayer", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["toast-error"]
    });
  }
}
