import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizarComponent } from './autorizar/autorizar.component';
import { InicioAutorizadorComponent } from './inicio-autorizador/inicio-autorizador.component';

const routes: Routes = [
  { path: '', component: InicioAutorizadorComponent },
  { path: 'autorizar/:id', component: AutorizarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioAutorizadorRoutingModule { }
