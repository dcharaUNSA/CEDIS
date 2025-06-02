import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Document {
  id: number;
  title: string;
  registrationDate: Date;
  publicationDate: Date;
  category: string;
  authors: string;
  currentVersion: number;
  totalVersions: number;
  selected?: boolean;
  description?: string;
  status?: string;
}

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  // Propiedades para los filtros
  searchTerm: string = '';
  publicationDate: string = '';
  selectedCategory: string = '';
  
  // Lista de categorías
  categories: Category[] = [
    { id: 1, name: 'Tesis' },
    { id: 2, name: 'Artículos' },
    { id: 3, name: 'Proyectos' },
    { id: 4, name: 'Informes' },
    { id: 5, name: 'Otros' }
  ];

  // Lista de autores
  authors: Author[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, name: 'María García', email: 'maria.garcia@example.com' },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com' },
    { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com' }
  ];

  // Lista de documentos
  documents: Document[] = [
    {
      id: 1,
      title: 'Sistema de Gestión Documental',
      registrationDate: new Date('2024-03-15'),
      publicationDate: new Date('2024-03-20'),
      category: 'Tesis',
      authors: 'Juan Pérez',
      currentVersion: 1,
      totalVersions: 1,
      description: 'Sistema para la gestión de documentos académicos',
      status: 'Publicado'
    },
    {
      id: 2,
      title: 'Análisis de Requisitos',
      registrationDate: new Date('2024-03-10'),
      publicationDate: new Date('2024-03-18'),
      category: 'Proyectos',
      authors: 'María García',
      currentVersion: 2,
      totalVersions: 3,
      description: 'Documento de análisis de requisitos del sistema',
      status: 'En revisión'
    },
    {
      id: 3,
      title: 'Metodología de Desarrollo Ágil',
      registrationDate: new Date('2024-03-05'),
      publicationDate: new Date('2024-03-15'),
      category: 'Artículos',
      authors: 'Carlos López, Ana Martínez',
      currentVersion: 1,
      totalVersions: 1,
      description: 'Artículo sobre metodologías ágiles en el desarrollo de software',
      status: 'Publicado'
    },
    {
      id: 4,
      title: 'Informe de Proyecto Final',
      registrationDate: new Date('2024-03-01'),
      publicationDate: new Date('2024-03-12'),
      category: 'Informes',
      authors: 'Juan Pérez, María García',
      currentVersion: 3,
      totalVersions: 3,
      description: 'Informe final del proyecto de grado',
      status: 'Finalizado'
    },
    {
      id: 5,
      title: 'Manual de Usuario',
      registrationDate: new Date('2024-02-28'),
      publicationDate: new Date('2024-03-10'),
      category: 'Otros',
      authors: 'Ana Martínez',
      currentVersion: 1,
      totalVersions: 2,
      description: 'Manual de usuario del sistema',
      status: 'En revisión'
    }
  ];

  // Documento seleccionado para edición
  selectedDocument: Document | null = null;
  isEditing: boolean = false;
  showRegisterModal = false;
  showUploadModal = false;
  showEditModal = false;
  documentToEdit: Document | null = null;
  showDownloadConfirmModal = false;
  showDeleteConfirmModal = false;
  showViewModal = false;
  documentToView: Document | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  // Método para manejar la búsqueda
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      return;
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    this.documents = this.documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTermLower) ||
      doc.id.toString().includes(searchTermLower)
    );
  }

  // Método para manejar cambios en los filtros
  onFilterChange(): void {
    let filteredDocs = [...this.documents];

    if (this.publicationDate) {
      const filterDate = new Date(this.publicationDate);
      filteredDocs = filteredDocs.filter(doc => 
        doc.publicationDate.toDateString() === filterDate.toDateString()
      );
    }

    if (this.selectedCategory) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.category === this.selectedCategory
      );
    }

    this.documents = filteredDocs;
  }

  // Método para seleccionar/deseleccionar todos los documentos
  toggleSelectAll(): void {
    const selectAllCheckbox = document.getElementById('selectAll') as HTMLInputElement;
    this.documents.forEach(doc => doc.selected = selectAllCheckbox.checked);
  }

  // Método para ver un documento
  viewDocument(doc: Document): void {
    this.documentToView = { ...doc };
    this.showViewModal = true;
  }

  // Método para editar un documento
  editDocument(doc: Document): void {
    this.documentToEdit = { ...doc };
    this.showEditModal = true;
  }

  // Método para eliminar un documento
  deleteDocument(doc: Document): void {
    if (confirm(`¿Está seguro de eliminar el documento "${doc.title}"?`)) {
      this.documents = this.documents.filter(d => d.id !== doc.id);
      console.log('Documento eliminado:', doc);
    }
  }

  // Método para guardar los cambios de edición
  saveDocument(): void {
    if (this.selectedDocument) {
      const index = this.documents.findIndex(d => d.id === this.selectedDocument?.id);
      if (index !== -1) {
        this.documents[index] = { ...this.selectedDocument };
      }
      this.isEditing = false;
      this.selectedDocument = null;
    }
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedDocument = null;
  }

  // Método para obtener documentos seleccionados
  getSelectedDocuments(): Document[] {
    return this.documents.filter(doc => doc.selected);
  }

  // Método para eliminar documentos seleccionados
  deleteSelectedDocuments(): void {
    const selectedDocs = this.getSelectedDocuments();
    if (selectedDocs.length === 0) {
      alert('Por favor, seleccione al menos un documento para eliminar.');
      return;
    }
    this.showDeleteConfirmModal = true;
  }

  onCloseDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
  }

  onConfirmDelete(): void {
    const selectedDocs = this.getSelectedDocuments();
    this.documents = this.documents.filter(doc => !doc.selected);
    console.log('Documentos eliminados:', selectedDocs);
    this.showDeleteConfirmModal = false;
  }

  // Método para agregar un nuevo documento
  addDocument(): void {
    this.showRegisterModal = true;
  }

  onCloseModal(): void {
    this.showRegisterModal = false;
  }

  onSaveDocument(documentData: any): void {
    const newDocument: Document = {
      id: this.documents.length + 1,
      title: documentData.title,
      registrationDate: new Date(),
      publicationDate: new Date(documentData.publicationDate),
      category: documentData.category,
      authors: documentData.authors,
      currentVersion: 1,
      totalVersions: documentData.quantity,
      description: '',
      status: 'Nuevo'
    };

    this.documents.unshift(newDocument);
    this.showRegisterModal = false;
  }

  // Método para descargar documentos seleccionados
  downloadSelected(): void {
    const selectedDocs = this.getSelectedDocuments();
    if (selectedDocs.length === 0) {
      alert('Por favor, seleccione al menos un documento para descargar.');
      return;
    }
    this.showDownloadConfirmModal = true;
  }

  onCloseDownloadConfirmModal(): void {
    this.showDownloadConfirmModal = false;
  }

  onConfirmDownload(): void {
    const selectedDocs = this.getSelectedDocuments();
    console.log('Descargando documentos:', selectedDocs);
    this.showDownloadConfirmModal = false;
  }

  // Método para subir documentos a la nube
  uploadToCloud(): void {
    const selectedDocs = this.getSelectedDocuments();
    if (selectedDocs.length === 0) {
      alert('Por favor, seleccione al menos un documento para subir a la nube.');
      return;
    }
    console.log('Subiendo documentos a la nube:', selectedDocs);
    alert(`Subiendo ${selectedDocs.length} documento(s) a la nube`);
  }

  openUploadModal() {
    this.showUploadModal = true;
  }

  onCloseUploadModal() {
    this.showUploadModal = false;
  }

  onUploadDocuments(file: File) {
    // Handle file upload logic here
    console.log('File to upload:', file);
    this.showUploadModal = false;
  }

  onCloseEditModal(): void {
    this.showEditModal = false;
    this.documentToEdit = null;
  }

  onSaveEditDocument(updatedDoc: Document): void {
    const index = this.documents.findIndex(d => d.id === updatedDoc.id);
    if (index !== -1) {
      this.documents[index] = { ...updatedDoc };
    }
    this.showEditModal = false;
    this.documentToEdit = null;
  }

  onCloseViewModal(): void {
    this.showViewModal = false;
    this.documentToView = null;
  }
} 