import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GsService } from 'src/app/main/services/gs.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form!: FormGroup;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  data = [];
  loading = false;
  constructor(private fb: FormBuilder, private service: GsService, private router: Router) { this.buildForm(); }

  ngOnInit(): void {
    this.setTableData();
    this.getClients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  buildForm(): void{
    this.form = this.fb.group({
      ine: [''],
      curp: [''],
      rfc: [''],
    });
  }

  setTableData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  getClients(): void{
    this.loading = !this.loading;
    this.service.getClients(this.form.value).subscribe((data) => {
      this.data = data;
      this.setTableData();
      this.loading = !this.loading;
    }, error => {
      this.loading = !this.loading;
    });
  }

  goCotizacion(id: number, status: number): void{
    if(status === 1){
      this.router.navigate([`/inicio/emisor/validacion/${id}`]);
    }else if(status === 2){
      this.router.navigate([`/inicio/emisor/cotizacion/${id}`]);

    }
  }

}
