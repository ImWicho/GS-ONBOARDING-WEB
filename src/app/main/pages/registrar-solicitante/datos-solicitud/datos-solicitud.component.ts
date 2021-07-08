import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GsService } from 'src/app/main/services/gs.service';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss']
})
export class DatosSolicitudComponent implements OnInit {
  @Output() datosSolicitud: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  filesComponent: File[] = [];
  products: any[] = [];
  constructor(private fb: FormBuilder, private service: GsService) { this.buildForm(); }

  ngOnInit(): void {
    this.getProducts();
  }

  emit(): void {
    setTimeout(() => {
      if(this.form.invalid){return;}
      this.datosSolicitud.emit(this.form.value);
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      product: ['', [Validators.required]],
    });
  }

  setFiles(event: any): void {
    this.filesComponent = event;
  }

  getProducts(): void {
    this.service.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

}
