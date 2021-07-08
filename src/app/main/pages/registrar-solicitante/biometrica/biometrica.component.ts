import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-biometrica',
  templateUrl: './biometrica.component.html',
  styleUrls: ['./biometrica.component.scss']
})
export class BiometricaComponent implements OnInit {
  ine!: string | ArrayBuffer | null;
  verify = false;
  constructor(private notiSvc: NotificationService) { }

  ngOnInit(): void {
  }

  setImageFromCamera(image64: any): void{
    this.ine = null;
    this.verify = true;
    setTimeout(() => {
      this.ine = image64;
      this.verify = false;
      this.notiSvc.openNotification({title: 'Validación del rostro exitosa', msg: 'Validada correctamente', correct: true, route: false});
    }, 4000);
  }

}
