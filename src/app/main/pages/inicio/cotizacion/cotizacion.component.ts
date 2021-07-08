import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GsService } from 'src/app/main/services/gs.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {
  id!: number;
  client!: any;
  form!: FormGroup;
  files: File[] = [];
  pdf!: any;
  loading = false;
  constructor(private activatedRouter: ActivatedRoute,
              private service: GsService,
              private fb: FormBuilder,
              private location: Location,
              private notiSvc: NotificationService,
              private router: Router) {
    this.id = activatedRouter.snapshot.params.id;
    this.buildForm();
   }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void{
    this.service.getClient(this.id).subscribe((data) => {
      this.client = data;
      this.form.get('product')?.setValue(this.client.product.name);
    });
  }

  setFiles(event: any): void{
    this.files = event;

    if(this.files.length !== 0){
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

  buildForm(): void{
    this.form = this.fb.group({
      product: [this.client?.product?.name],
      numero_poliza: ['', [Validators.required]],
      numero_solicitud: ['', [Validators.required]],
    });
  }

  back(): void{
    this.location.back();
  }

  async sendData(): Promise<void>{
    try{
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.files[0]);
      formData.append('document_id', '4');
      formData.append('prospect_id', this.id.toString());
      await this.service.uploadDocument(formData);
      await this.service.updateClient(
        {
          id: this.id,
          status : 3,
          policy_number: this.form.get('numero_poliza')?.value,
          application_number: this.form.get('numero_solicitud')?.value
        }
      );
      this.notiSvc.openNotification(
        {title: 'Cotización se ha creado correctamente', msg: 'Cotización creada correctamente', correct:true, route: true});
        this.loading = false;
    }catch(error: any){
      this.notiSvc.openNotification({title: 'Ocurrió un error', msg: 'Contacta a soporte', correct: false, route: false});
      this.loading = false;
    }
  }

}
