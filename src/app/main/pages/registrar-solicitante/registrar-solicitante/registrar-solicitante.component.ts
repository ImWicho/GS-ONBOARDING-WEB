import { Component, OnInit } from '@angular/core';
import { GsService } from 'src/app/main/services/gs.service';
import * as dayjs from 'dayjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-registrar-solicitante',
  templateUrl: './registrar-solicitante.component.html',
  styleUrls: ['./registrar-solicitante.component.scss']
})
export class RegistrarSolicitanteComponent implements OnInit {
  datosSolicitud!: any;
  datosFinancieros!: any;
  coords!: any;
  datosProspecto!: any;
  redes!: any;
  ine!: any;
  loading = false;
  docs!: any;
  constructor(private service: GsService, private notiSvc: NotificationService) { }

  ngOnInit(): void {
  }

  get isDisabled(){
    return !this.datosSolicitud || !this.datosFinancieros || !this.coords ||
      !this.datosProspecto || !this.redes || !this.ine;
  }

  setDocs(event: any): void{
    this.docs = event;
    console.log(this.docs);

  }

  async uploadDocuments(id_client: number): Promise<void>{
    for(let i = 0; this.docs.docs.length > i; i++){
      const formData = new FormData();
      formData.append('file', this.docs.docs[i]);
      formData.append('document_id', this.docs.ids[i].id);
      formData.append('prospect_id', id_client.toString());

      await this.service.uploadDocument(formData);
    }
  }

  async sendData(): Promise<void>{
    try{
      const data = {
        ...this.datosSolicitud,
        ...this.datosFinancieros,
        ...this.coords,
        ...this.datosProspecto,
        ...this.redes,
        status : 1,
        emitter: 1,
        authorizing: 2
      };
      data.expiration_date = dayjs(data.expiration_date).format('YYYY-MM-DD');

      this.loading = true;
      const client = await this.service.saveClient(data);
      const formData = new FormData();
      formData.append('file', this.ine);
      formData.append('document_id', '8');
      formData.append('prospect_id', client.id.toString());
      await this.service.uploadDocument(formData);
      this.uploadDocuments(client.id);
      this.notiSvc.
      openNotification({
        title: 'Se registró una solicitud exitosamente',
        msg: 'Se ha registrado una solicitud de porspecto de forma correcta', correct: true, route: true});
    }catch(error: any){
      this.notiSvc.openNotification({title: 'Ocurrió un error', msg: 'Contacta a soporte', correct: false, route: false});
      this.loading = false;
    }
  }

}
