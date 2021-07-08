import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadCameraComponent } from '../load-camera/load-camera.component';

@Component({
  selector: 'app-get-camera',
  templateUrl: './get-camera.component.html',
  styleUrls: ['./get-camera.component.scss']
})
export class GetCameraComponent implements OnInit {
  @Output() getImage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCamera(): void{
    this.dialog.open(LoadCameraComponent, {
      disableClose: true,
    }).afterClosed().subscribe((data) => {
      if(data){
        this.getImage.emit(data);
      }
    });
  }

}
