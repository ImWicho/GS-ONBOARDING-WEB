import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { PipesModule } from 'src/app/shared/modules/pipes.module';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ValidacionComponent } from './validacion/validacion.component';


@NgModule({
  declarations: [InicioComponent, CotizacionComponent, ValidacionComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    PipesModule
  ],
  providers: [NotificationService]
})
export class InicioModule { }
