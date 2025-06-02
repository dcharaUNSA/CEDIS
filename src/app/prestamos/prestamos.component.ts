import { Component, OnInit } from '@angular/core';

interface Prestamo {
  id: number;
  fechaSolicitud: Date;
  lector: string;
  bibliografia: string;
  estado: 'Vigente' | 'Vencido' | 'Devuelto';
  selected?: boolean;
}

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  // Propiedades para los filtros
  searchTerm: string = '';
  publicationDate: string = '';
  category: string = '';

  // Lista de préstamos
  prestamos: Prestamo[] = [
    {
      id: 1,
      fechaSolicitud: new Date('2024-03-15'),
      lector: 'Juan Pérez',
      bibliografia: 'Introducción a la Programación',
      estado: 'Vigente'
    },
    {
      id: 2,
      fechaSolicitud: new Date('2024-03-10'),
      lector: 'María García',
      bibliografia: 'Base de Datos Avanzadas',
      estado: 'Devuelto'
    },
    {
      id: 3,
      fechaSolicitud: new Date('2024-03-05'),
      lector: 'Carlos López',
      bibliografia: 'Inteligencia Artificial',
      estado: 'Vencido'
    }
  ];

  // Propiedades para los modales
  showRegisterModal = false;
  showEditModal = false;
  showViewModal = false;
  showDeleteConfirmModal = false;
  prestamoToEdit: Prestamo | null = null;
  prestamoToView: Prestamo | null = null;

  // Categorías para el filtro
  categories = [
    'Todos',
    'Tesis',
    'Artículos',
    'Proyectos',
    'Informes',
    'Otros'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Métodos para los filtros
  applyFilters(): void {
    // Implementar lógica de filtrado
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.publicationDate = '';
    this.category = '';
    this.applyFilters();
  }

  // Métodos para la selección de préstamos
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.prestamos.forEach(prestamo => prestamo.selected = checked);
  }

  getSelectedPrestamos(): Prestamo[] {
    return this.prestamos.filter(prestamo => prestamo.selected);
  }

  // Métodos para los modales
  addPrestamo(): void {
    this.showRegisterModal = true;
  }

  onCloseModal(): void {
    this.showRegisterModal = false;
  }

  onSavePrestamo(prestamo: any): void {
    const newPrestamo: Prestamo = {
      id: this.prestamos.length + 1,
      fechaSolicitud: new Date(),
      lector: prestamo.lector,
      bibliografia: prestamo.bibliografia,
      estado: 'Vigente'
    };
    this.prestamos.unshift(newPrestamo);
    this.showRegisterModal = false;
  }

  editPrestamo(prestamo: Prestamo): void {
    this.prestamoToEdit = { ...prestamo };
    this.showEditModal = true;
  }

  onCloseEditModal(): void {
    this.showEditModal = false;
    this.prestamoToEdit = null;
  }

  onSaveEditPrestamo(prestamo: Prestamo): void {
    const index = this.prestamos.findIndex(p => p.id === prestamo.id);
    if (index !== -1) {
      this.prestamos[index] = { ...prestamo };
    }
    this.showEditModal = false;
  }

  viewPrestamo(prestamo: Prestamo): void {
    this.prestamoToView = prestamo;
    this.showViewModal = true;
  }

  onCloseViewModal(): void {
    this.showViewModal = false;
    this.prestamoToView = null;
  }

  deletePrestamo(prestamo: Prestamo): void {
    this.prestamoToEdit = prestamo;
    this.showDeleteConfirmModal = true;
  }

  onCloseDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
    this.prestamoToEdit = null;
  }

  onConfirmDelete(): void {
    if (this.prestamoToEdit) {
      this.prestamos = this.prestamos.filter(p => p.id !== this.prestamoToEdit!.id);
    }
    this.showDeleteConfirmModal = false;
    this.prestamoToEdit = null;
  }

  markAsReturned(prestamo: Prestamo): void {
    const index = this.prestamos.findIndex(p => p.id === prestamo.id);
    if (index !== -1) {
      this.prestamos[index] = { ...prestamo, estado: 'Devuelto' };
    }
  }
} 