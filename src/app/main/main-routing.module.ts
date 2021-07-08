import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'prospecto', loadChildren: () =>
        import('./pages/inicio-prospecto/inicio-prospecto.module').then((m) => m.InicioProspectoModule) },
      { path: 'autorizador', loadChildren: () =>
        import('./pages/inicio-autorizador/inicio-autorizador.module').then((m) => m.InicioAutorizadorModule) },
      { path: 'emisor', loadChildren: () => import('./pages/inicio/inicio.module').then((m) => m.InicioModule) },
      { path: 'registrar-solicitante', loadChildren: () => import('./pages/registrar-solicitante/registrar-solicitante.module')
          .then((m) => m.RegistrarSolicitanteModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
