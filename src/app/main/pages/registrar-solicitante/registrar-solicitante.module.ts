import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarSolicitanteRoutingModule } from './registrar-solicitante-routing.module';
import { RegistrarSolicitanteComponent } from './registrar-solicitante/registrar-solicitante.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IneComponent } from './ine/ine.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DatosSolicitudComponent } from './datos-solicitud/datos-solicitud.component';
import { DocumentosAdicionalesComponent } from './documentos-adicionales/documentos-adicionales.component';
import { DatosFinancierosComponent } from './datos-financieros/datos-financieros.component';
import { BiometricaComponent } from './biometrica/biometrica.component';
import { MapaComponent } from './mapa/mapa.component';
import { DatosProspectoComponent } from './datos-prospecto/datos-prospecto.component';
import { RedesSocialesComponent } from './redes-sociales/redes-sociales.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ContactosComponent } from './contactos/contactos.component';


@NgModule({
  declarations: [
    RegistrarSolicitanteComponent,
    IneComponent,DatosSolicitudComponent,
    DocumentosAdicionalesComponent,
    DatosFinancierosComponent,
    BiometricaComponent,
    MapaComponent,
    DatosProspectoComponent,
    RedesSocialesComponent,
    ContactosComponent
  ],
  imports: [
    CommonModule,
    RegistrarSolicitanteRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [
    NotificationService
  ]
})
export class RegistrarSolicitanteModule { }
