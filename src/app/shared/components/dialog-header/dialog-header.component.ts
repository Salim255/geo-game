import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstructionService } from '../../../features/game-screen/services/instructions.service';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
  standalone: false
})
export class DialogHeaderComponent {

  @Input() title: string = '';

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
