import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GsService } from 'src/app/main/services/gs.service';

@Component({
  selector: 'app-documentos-adicionales',
  templateUrl: './documentos-adicionales.component.html',
  styleUrls: ['./documentos-adicionales.component.scss']
})
export class DocumentosAdicionalesComponent implements OnInit {
  @Output() docsAditionals: EventEmitter<any> = new EventEmitter();
  filesComponent: File[] = [];
  filesType: any[] = [];
  labels: string[] = [];
  documents: any[] = [];
  formControl: FormControl = new FormControl('', [Validators.required]);
  constructor(private service: GsService) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  setFiles(event: any ): void{
    this.filesComponent.push(event[0]);
    this.filesType.push({ id: this.formControl.value.id, name: this.formControl.value.name });
    this.formControl.reset();
    this.docsAditionals.emit({ docs: this.filesComponent, ids: this.filesType  });
  }

  setFiles2(event: any ): void{
    this.filesComponent = event;
    this.formControl.reset();
    this.docsAditionals.emit({ docs: this.filesComponent, ids: this.filesType  });
  }

  removeFile(idx: number): void{
    this.filesType.splice(idx, 1);
    this.formControl.reset();
    this.docsAditionals.emit({ docs: this.filesComponent, ids: this.filesType  });
  }

  getDocuments(): void{
    this.service.getDocuments().subscribe((data) => {
      this.documents = data;
    });
  }

}
