import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioAutorizadorRoutingModule } from './inicio-autorizador-routing.module';
import { InicioAutorizadorComponent } from './inicio-autorizador/inicio-autorizador.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/modules/pipes.module';
import { AutorizarComponent } from './autorizar/autorizar.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NotificationService } from 'src/app/shared/services/notification.service';


@NgModule({
  declarations: [InicioAutorizadorComponent, AutorizarComponent],
  imports: [
    CommonModule,
    InicioAutorizadorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    SharedComponentsModule
  ],
  providers: [
    NotificationService
  ]
})
export class InicioAutorizadorModule { }
