import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snack: MatSnackBar, private dialog: MatDialog) { }

  openSnackBar(msg: string, time: number): Observable<void>{
    return this.snack.open(msg, undefined, { duration: time}).afterOpened();
  }

  openNotification(datax: {title: string;msg: string; correct: boolean; route?: boolean}): Observable<any>{
    return this.dialog.open(NotificationComponent, {
      disableClose: true,
      width: '600px',
      data: datax
    }).afterClosed();
  }
}
