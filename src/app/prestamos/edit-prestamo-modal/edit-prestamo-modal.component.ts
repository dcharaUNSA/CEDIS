import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-prestamo-modal',
  templateUrl: './edit-prestamo-modal.component.html',
  styleUrls: ['./edit-prestamo-modal.component.css']
})
export class EditPrestamoModalComponent {
  @Input() prestamo: any;
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

  ngOnChanges(): void {
    if (this.prestamo) {
      this.prestamoForm.patchValue({
        lector: this.prestamo.lector,
        bibliografia: this.prestamo.bibliografia,
        fechaSolicitud: this.prestamo.fechaSolicitud,
        estado: this.prestamo.estado
      });
    }
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