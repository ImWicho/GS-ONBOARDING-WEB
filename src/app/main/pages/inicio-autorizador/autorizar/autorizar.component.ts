import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GsService } from 'src/app/main/services/gs.service';
import * as FileSaver from 'file-saver';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.scss'],
})
export class AutorizarComponent implements OnInit {
  id!: number;
  client!: any;
  form!: FormGroup;
  files: File[] = [];
  pdf!: any;
  loading = false;
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: GsService,
    private location: Location,
    private notiSvc: NotificationService
  ) {
    this.id = activatedRouter.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.service.getClient(this.id).subscribe((data) => {
      this.client = data;
      this.client.documents.forEach((x: any) => {
        this.getDocuments(x.route, x.document.name);
      });
    });
  }

  async getDocuments(file: string, name: string): Promise<void>{
    const filex = await this.service.getDocument(file);
    this.convertBase64ToFile(filex.file, name);
  }

  setFiles(event: any): void {
    this.files = event;

    if (this.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
      reader.onload = () => {
        this.pdf = reader.result;
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  back(): void {
    this.location.back();
  }

  async sendData(): Promise<void> {
    try{
      this.loading = true;
      await this.service.updateClient({id: this.id, status : 4});
      this.notiSvc.openNotification(
        {title: 'El prospecto fue autorizado correctamente', msg: 'Autorizado correctamente', correct:true, route: true});
        this.loading = false;
    }catch(error: any){
      this.loading = false;
      this.notiSvc.openNotification({title: 'Ocurrió un error', msg: 'Contacta a soporte', correct: false, route: false});
    }
  }

  convertBase64ToFile(filex: string, name: string): void {
    const url = filex;
    const typex = url.substring(url.indexOf(':') + 1, url.indexOf(';base64'));
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], name, { type: typex });
        this.files.push(file);
      });
  }

  preview(idx: number): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.files[idx]);
    reader.onload = () => {
      this.pdf = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  download(idx: number): void {
    FileSaver.saveAs(this.files[idx], 'document');
  }
}
