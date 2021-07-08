import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { GsService } from 'src/app/main/services/gs.service';

@Component({
  selector: 'app-inicio-prospecto',
  templateUrl: './inicio-prospecto.component.html',
  styleUrls: ['./inicio-prospecto.component.scss']
})
export class InicioProspectoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form!: FormGroup;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['1', '2', '3', '4', '5'];
  data = [];
  loading = false;
  statuses: any[] = [];
  email!: string | null;
  constructor(private fb: FormBuilder, private service: GsService, private router: Router) { this.buildForm(); }

  ngOnInit(): void {
    this.email = localStorage.getItem('emailTypeSS');
    this.setTableData();
    this.getProspects();
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  buildForm(): void{
    this.form = this.fb.group({
      application_number: [''],
      product_name: [''],
      start_date: [''],
      end_date: [''],
    });
  }

  setTableData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  goCotizacion(id: number): void{
    this.router.navigate([`/inicio/prospecto/aceptar-cotizacion/${id}`]);
  }

  getProducts(): void{
    this.service.getProducts().subscribe((data) => {
      this.statuses = data;
    });
  }

  getProspects(): void{
    this.loading = !this.loading;
    if(this.form.get('start_date')?.value){
      this.form.get('start_date')?.setValue(dayjs(this.form.get('start_date')?.value).format('YYYY-MM-DD'));
    }
    if(this.form.get('end_date')?.value){
      this.form.get('end_date')?.setValue(dayjs(this.form.get('end_date')?.value).format('YYYY-MM-DD'));
    }
    this.service.getProspects(this.email, this.form.value).subscribe((data) => {
      this.data = data;
      this.setTableData();
      this.loading = !this.loading;
      this.form.reset();
    }, error => {
      this.loading = !this.loading;
    });
  }
}
