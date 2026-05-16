import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { InstructionService } from "../../../features/game-screen/services/instructions.service";
import { ActionService } from "../../../features/game-screen/services/action.service";
import { StoredTargetService} from "../../../features/game-screen/services/stored-target-service";
import { CurrentTargetService } from "../../../features/game-screen/services/currentTarget.service";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  standalone: false
})
export class HeaderComponent {

  constructor(
     private dialog: MatDialog,
    private currentTargetService: CurrentTargetService,
    private storedTargetService: StoredTargetService,
    private actionService: ActionService,
    private instructionService: InstructionService,
    private router: Router,
  ){}

  home(){
   // this.router.navigate(["/home"])
  }


  onRest(){
    // Do nothing if already on home page
    if (this.router.url === '/game-screen') {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '320px',
        disableClose: true,
        panelClass: 'premium-dialog'
      });


      dialogRef.afterClosed().subscribe((confirmed) => {

        if (!confirmed) return;

        setTimeout(() => {
          this.storedTargetService.clearCurrentTarget();
          this.currentTargetService.setCurrentTarget(null);
          this.currentTargetService.onClose();
          this.router.navigate(['/home']);
        }, 1000);

      });
    }


  }
}
