import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  user: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private dialog: MatDialogRef<NotificationComponent>) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('userTypeSS');

  }

  onClose(): void{
    if(this.data.route){
      switch(this.user){
        case '1':
          this.router.navigate(['/inicio/prospecto']);
          break;
        case '2':
          this.router.navigate(['/inicio/autorizador']);
          break;
        case '3':
          this.router.navigate(['/inicio/emisor']);
          break;
      }
    }
    this.dialog.close();
  }

}
