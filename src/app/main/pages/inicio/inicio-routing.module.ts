import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { InicioComponent } from './inicio/inicio.component';
import { ValidacionComponent } from './validacion/validacion.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'cotizacion/:id', component: CotizacionComponent },
  { path: 'validacion/:id', component: ValidacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
