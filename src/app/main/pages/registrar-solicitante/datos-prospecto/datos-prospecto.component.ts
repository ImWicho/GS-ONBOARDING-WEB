import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { GsService } from 'src/app/main/services/gs.service';
import { EMAIL, NUMBER, RFC } from 'src/app/shared/constants/regex';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-datos-prospecto',
  templateUrl: './datos-prospecto.component.html',
  styleUrls: ['./datos-prospecto.component.scss']
})
export class DatosProspectoComponent implements OnInit {
  @Output() datosProspecto: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  archivoFiscal: File[] = [];
  archivoLaboral: File[] = [];
  rfcValidate = false;
  constructor(private fb: FormBuilder, private service: GsService, private notiSvc: NotificationService) { this.buildForm(); }

  ngOnInit(): void {
    this.service.infoIne$.subscribe((infoInex: any) => {
      this.form.patchValue({
        name: infoInex.givenName,
        last_name : infoInex.firstLastName + ' ' + infoInex.secondLastName,
        postal_code : infoInex.postalCode,
        municipality: infoInex.municipality,
        city: infoInex.city,
        colony: infoInex.borough
      });

    });
  }

  emit(): void{
    if(this.form.invalid) { return; }
    this.datosProspecto.emit(this.form.value);
  }

  validateRFC(): void{
    this.rfcValidate = true;
    setTimeout(() => {
      this.rfcValidate = false;
      this.notiSvc.openNotification(
        { title: '¡El RFC fue validado ante el SAT!', msg : 'Validado correctamente', route: false, correct: true});
    }, 3000);
  }

  setFileFiscal(event: any): void{
    this.archivoFiscal = event;
  }

  setFileLaboral(event: any): void{
    this.archivoLaboral = event;
  }

  buildForm(): void{
    this.form = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      second_last_name: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.pattern(RFC)]],
      curp: ['', Validators.required],
      elector_key: ['', [Validators.required]],
      cell_phone: ['', [Validators.required, Validators.pattern(NUMBER),Validators.maxLength(10)] ],
      email: ['', [Validators.required, Validators.pattern(EMAIL)]],
      phone: ['', [Validators.required, Validators.pattern(NUMBER),Validators.maxLength(10)]],
      work_phone: ['', [Validators.required, Validators.pattern(NUMBER), Validators.maxLength(10)]],
      street: ['', Validators.required],
      ext_number: ['', [Validators.required, Validators.pattern(NUMBER)]],
      colony: ['', Validators.required],
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', [Validators.required, Validators.pattern(NUMBER),Validators.maxLength(5)]],
      work_street: ['', Validators.required],
      work_ext_number: ['', Validators.required],
      work_colony: ['', Validators.required],
      work_city: ['', Validators.required],
      work_municipality: ['', Validators.required],
      work_state: ['', Validators.required],
      work_postal_code: ['', [Validators.required,Validators.maxLength(5)]],
    });
  }

}
