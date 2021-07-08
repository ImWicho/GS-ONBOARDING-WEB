import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-load-camera',
  templateUrl: './load-camera.component.html',
  styleUrls: ['./load-camera.component.scss']
})
export class LoadCameraComponent implements OnInit {
  public multipleWebcamsAvailable = false;
  private trigger: Subject<void> = new Subject<void>();
  constructor(private dialog: MatDialogRef<LoadCameraComponent>) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  handleImage(webcamImage: WebcamImage): void {
    this.dialog.close(webcamImage.imageAsDataUrl);
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
