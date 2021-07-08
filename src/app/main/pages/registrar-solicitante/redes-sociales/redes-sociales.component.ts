import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.scss']
})
export class RedesSocialesComponent implements OnInit {
  @Output() redes: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  constructor(private fb: FormBuilder) { this.buildForm(); }

  ngOnInit(): void {
  }

  buildForm(): void{
    this.form = this.fb.group({
      facebook: [''],
      twitter: [''],
      linked_in: [''],
    });
  }

  emit(): void{
    this.redes.emit(this.form.value);
  }

}
