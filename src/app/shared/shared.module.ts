import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogHeaderComponent } from "./components/dialog-header/dialog-header.component";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [DialogHeaderComponent],
  exports: [DialogHeaderComponent]
})
export class SharedModule{}
