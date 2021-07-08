import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from '../modules/material.module';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from '@angular/router';
import { GetFilesComponent } from './files/get-files/get-files.component';
import { ListFilesComponent } from './files/list-files/list-files.component';
import { LoadFilesComponent } from './files/load-files/load-files.component';
import { GetCameraComponent } from './camera/get-camera/get-camera.component';
import { LoadCameraComponent } from './camera/load-camera/load-camera.component';
import { WebcamModule } from 'ngx-webcam';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    LoadingComponent,
    GetFilesComponent,
    ListFilesComponent,
    LoadFilesComponent,
    GetCameraComponent,
    LoadCameraComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    WebcamModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    LoadingComponent,
    ListFilesComponent,
    GetFilesComponent,
    LoadFilesComponent,
    GetCameraComponent,
    LoadCameraComponent
  ]
})
export class SharedComponentsModule { }
