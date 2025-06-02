import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrestamosComponent } from './prestamos.component';
import { RegisterPrestamoModalComponent } from './register-prestamo-modal/register-prestamo-modal.component';
import { EditPrestamoModalComponent } from './edit-prestamo-modal/edit-prestamo-modal.component';
import { ViewPrestamoModalComponent } from './view-prestamo-modal/view-prestamo-modal.component';
import { ConfirmActionModalComponent } from './confirm-action-modal/confirm-action-modal.component';

// Importar estilos de cards
import '../../../assets/sass/lbd/_cards.scss';

const routes: Routes = [
  {
    path: '',
    component: PrestamosComponent
  }
];

@NgModule({
  declarations: [
    PrestamosComponent,
    RegisterPrestamoModalComponent,
    EditPrestamoModalComponent,
    ViewPrestamoModalComponent,
    ConfirmActionModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrestamosModule { } 