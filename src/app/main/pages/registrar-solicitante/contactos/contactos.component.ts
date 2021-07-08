import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL, NUMBER } from 'src/app/shared/constants/regex';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {
  form!: FormGroup;
  contacts: any[] = [];
  constructor(private fb: FormBuilder) { this.buildForm(); }

  ngOnInit(): void {
  }

  buildForm(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      cell_phone: ['', [Validators.required, Validators.pattern(NUMBER)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL)]]
    });
  }

  addContact(): void{
    if(this.form.invalid){ return; }
    this.contacts.push(this.form.value);
    this.form.reset();
  }

  delete(idx: number){
    this.contacts.splice(idx, 1);
  }

}
