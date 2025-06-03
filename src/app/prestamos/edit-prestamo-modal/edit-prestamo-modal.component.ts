import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-prestamo-modal',
  templateUrl: './edit-prestamo-modal.component.html',
  styleUrls: ['./edit-prestamo-modal.component.css']
})
export class EditPrestamoModalComponent {
  @Input() prestamo: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePrestamo = new EventEmitter<any>();

  prestamoForm: FormGroup;
  estados = ['Vigente', 'Vencido', 'Devuelto'];

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

  ngOnChanges(): void {
    if (this.prestamo) {
      this.prestamoForm.patchValue({
        lector: this.prestamo.lector,
        lectorId: this.prestamo.lectorId,
        bibliografia: this.prestamo.bibliografia,
        bibliografiaId: this.prestamo.bibliografiaId,
        fechaSolicitud: this.formatDate(this.prestamo.fechaSolicitud),
        estado: this.prestamo.estado
      });
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    if (this.prestamoForm.valid) {
      const formValue = this.prestamoForm.value;
      const updatedPrestamo = {
        ...this.prestamo,
        ...formValue,
        fechaSolicitud: new Date(formValue.fechaSolicitud)
      };
      this.savePrestamo.emit(updatedPrestamo);
      this.closeModal.emit();
    }
  }
} 