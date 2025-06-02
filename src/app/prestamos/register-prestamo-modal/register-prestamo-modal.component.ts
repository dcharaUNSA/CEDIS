import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-prestamo-modal',
  templateUrl: './register-prestamo-modal.component.html',
  styleUrls: ['./register-prestamo-modal.component.css']
})
export class RegisterPrestamoModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

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
      bibliografia: ['', Validators.required],
      fechaSolicitud: [new Date(), Validators.required],
      estado: ['Activo', Validators.required]
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    if (this.prestamoForm.valid) {
      this.save.emit(this.prestamoForm.value);
      this.close.emit();
    }
  }
} 