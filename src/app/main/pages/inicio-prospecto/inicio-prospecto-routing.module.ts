import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptarContizacionComponent } from './aceptar-contizacion/aceptar-contizacion.component';
import { InicioProspectoComponent } from './inicio-prospecto/inicio-prospecto.component';

const routes: Routes = [
  { path: '', component: InicioProspectoComponent },
  { path: 'aceptar-cotizacion/:id', component: AceptarContizacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioProspectoRoutingModule { }
