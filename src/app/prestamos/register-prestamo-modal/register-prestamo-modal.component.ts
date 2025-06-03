import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-prestamo-modal',
  templateUrl: './register-prestamo-modal.component.html',
  styleUrls: ['./register-prestamo-modal.component.css']
})
export class RegisterPrestamoModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePrestamo = new EventEmitter<any>();

  prestamoForm: FormGroup;
  categories = [
    { id: 1, name: 'Libro' },
    { id: 2, name: 'Revista' },
    { id: 3, name: 'Tesis' },
    { id: 4, name: 'Otro' }
  ];

  constructor(private fb: FormBuilder) {
    this.prestamoForm = this.fb.group({
      lector: ['', Validators.required],
      lectorId: ['', Validators.required],
      bibliografia: ['', Validators.required],
      bibliografiaId: ['', Validators.required],
      fechaSolicitud: [new Date(), Validators.required],
      estado: ['Vigente', Validators.required]
    });
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    if (this.prestamoForm.valid) {
      this.savePrestamo.emit(this.prestamoForm.value);
      this.closeModal.emit();
    }
  }
} 