import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarSolicitanteComponent } from './registrar-solicitante/registrar-solicitante.component';

const routes: Routes = [
  { path: '', component: RegistrarSolicitanteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarSolicitanteRoutingModule { }
