import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {
  @Input() files!: File[];
  @Output() getFiles: EventEmitter<File[] | File> = new EventEmitter();
  @Input() removeFile = false;
  @Output() idx: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  deleteFile(idx: number): void{
    this.files.splice(idx, 1);
    this.getFiles.emit(this.files);
    this.idx.emit(idx);
  }

}
