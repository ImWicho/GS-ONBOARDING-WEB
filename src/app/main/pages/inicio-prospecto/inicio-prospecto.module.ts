import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioProspectoRoutingModule } from './inicio-prospecto-routing.module';
import { InicioProspectoComponent } from './inicio-prospecto/inicio-prospecto.component';
import { AceptarContizacionComponent } from './aceptar-contizacion/aceptar-contizacion.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/modules/pipes.module';
import { NotificationService } from 'src/app/shared/services/notification.service';


@NgModule({
  declarations: [InicioProspectoComponent, AceptarContizacionComponent],
  imports: [
    CommonModule,
    InicioProspectoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    NotificationService
  ]
})
export class InicioProspectoModule { }
