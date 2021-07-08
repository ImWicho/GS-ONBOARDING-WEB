import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Location } from '@angular/common';
import { GsService } from 'src/app/main/services/gs.service';

@Component({
  selector: 'app-aceptar-contizacion',
  templateUrl: './aceptar-contizacion.component.html',
  styleUrls: ['./aceptar-contizacion.component.scss']
})
export class AceptarContizacionComponent implements OnInit {
  pdf!: any;
  loading = false;
  client!: any;
  id!: any;
  constructor(private location: Location,
    private notiSvc: NotificationService,
    private service: GsService,
    private activatedRoute: ActivatedRoute) { this.id = activatedRoute.snapshot.params.id; }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.service.getClient(this.id).subscribe((data) => {
      this.client = data;
      this.client.documents.forEach((x: any) => {
        if (x.document.id === 4) {
          this.getDocuments(x.route);
        }
      });
    });
  }

  async getDocuments(file: string): Promise<void> {
    const filex = await this.service.getDocument(file);
    this.pdf = filex.file;
  }

  async sendData(x: boolean): Promise<void> {
    try {
      this.loading = true;
      await this.service.updateClient({id: this.id, accepted: x });
      this.notiSvc.openNotification(
        { title: 'Se ha enviado tu respuesta', msg: 'Se ha enviado tu respuesta', correct: true, route: true });
      this.loading = false;
    } catch (error: any) {
      this.notiSvc.openNotification({title: 'Ocurrió un error', msg: 'Contacta a soporte', correct: false, route: false});
      this.loading = false;
    }
  }

  back(): void {
    this.location.back();
  }
}
