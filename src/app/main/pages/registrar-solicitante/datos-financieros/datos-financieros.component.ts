import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GsService } from 'src/app/main/services/gs.service';
import { NUMBER } from 'src/app/shared/constants/regex';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-datos-financieros',
  templateUrl: './datos-financieros.component.html',
  styleUrls: ['./datos-financieros.component.scss']
})
export class DatosFinancierosComponent implements OnInit {
  @Output() datosFinancieros: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  payments: any[] = [];
  constructor(private fb: FormBuilder, private service: GsService, private notiSvc: NotificationService) { this.buildForm(); }

  ngOnInit(): void {
    this.getPayments();
    this.listener();
  }

  buildForm(): void{
    this.form = this.fb.group({
      payment: ['', [Validators.required]],
      card_number: ['', [Validators.required, Validators.pattern(NUMBER), Validators.minLength(16), Validators.maxLength(16)]],
      expiration_date: ['', [Validators.required]],
      credit_bureau: [false, [Validators.required]],
      cobro: ['', [Validators.required]]
    });
  }

  emit(): void{
    setTimeout(() => {
      if(this.form.invalid){ return; }
      console.log(this.form.value);
      this.datosFinancieros.emit(this.form.value);
    });
  }

  getPayments(): void{
    this.service.getPayments().subscribe((data) => {
      this.payments = data;
    });
  }

  listener(): void{
    this.form.get('expiration_date')?.valueChanges.subscribe((data) => {
      this.emit();

    });
  }

  bureau(event: any): void{
    this.emit();
    if(event.checked){
      this.notiSvc.openNotification(
        { title: '¡El buro de crédito fue validado!', msg : 'Validado correctamente', route: false, correct: true});
    }
  }

}
