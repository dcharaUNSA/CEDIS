import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.css']
})
export class ConfirmActionModalComponent {
  @Input() title: string = 'Confirmar acción';
  @Input() message: string = '¿Está seguro de realizar esta acción?';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
    this.close.emit();
  }
} 