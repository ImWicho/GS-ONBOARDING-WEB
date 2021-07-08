import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GsService } from 'src/app/main/services/gs.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-ine',
  templateUrl: './ine.component.html',
  styleUrls: ['./ine.component.scss'],
})
export class IneComponent implements OnInit {
  @Output() ineFile: EventEmitter<File> = new EventEmitter<File>();
  ine!: string | ArrayBuffer | null;
  image!: File;
  loading = false;
  constructor(private service: GsService, private notiSvc: NotificationService) {}

  ngOnInit(): void {}

  async setImageFromCamera(image64: any): Promise<void> {
    try {
      this.ine = null;
      this.loading = true;
      const url = image64;
      const typex = url.substring(
        image64.indexOf(':') + 1,
        url.indexOf(';base64')
      );
      await fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'File name', { type: typex });
          this.image = file;
          this.ineFile.emit(this.image);
        });
      const names = await this.service.getName(this.image);
      const address = await this.service.getAddress(this.image);
      this.emitInfoIne({ ...names, ...address });
      this.ine = image64;
      this.loading = false;
      this.notiSvc.openNotification(
        {title: '¡Validación ante el INE fue exitosa!', msg: 'Validada correctamente', correct: true, route: false});
    } catch (erorr: any) {
      console.log('Ocurrió un error');
    }
  }

  async setImageFromDocuments(image: any): Promise<void> {
    try {
      this.ine = null;
      this.loading = true;
      this.image = image[0];
      const names = await this.service.getName(this.image);
      const address = await this.service.getAddress(this.image);
      this.emitInfoIne({ ...names, ...address });
      this.ineFile.emit(this.image);
      const reader = new FileReader();
      reader.readAsDataURL(image[0]);
      reader.onload = () => {
        this.ine = reader.result;
        this.loading = false;
        this.notiSvc.openNotification(
          {title: '¡Validación ante el INE fue exitosa!', msg: 'Validada correctamente', correct: true, route: false});
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    } catch (error: any) {
      console.log('Ocurrió un error');
    }
  }

  emitInfoIne(data: any): void{
    this.service.infoIne$.next(data);
  }
}
