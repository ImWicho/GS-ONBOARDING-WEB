import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL } from 'src/app/shared/constants/regex';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notiSvc: NotificationService
  ) {
    this.onBuildForm();
  }

  ngOnInit(): void {}

  onLogIn(): void {
    this.loading = true;
    if (this.form.invalid) {
      return;
    }
    if (this.form.get('email')?.value === 'luis.carrillo.eon@gmail.com') {
      this.notiSvc
        .openSnackBar('Bienvenido a General de Seguros', 3000)
        .subscribe(() => {
          localStorage.setItem('userTypeSS', '3');
          localStorage.setItem('emailTypeSS', 'luis.carrillo.eon@gmail.com');
          this.router.navigate(['/inicio/emisor']);
        });
    } else if (this.form.get('email')?.value === 'jessica.lechuga@eon.com.mx') {
      this.notiSvc
        .openSnackBar('Bienvenido a General de Seguros', 3000)
        .subscribe(() => {
          localStorage.setItem('userTypeSS', '2');
          localStorage.setItem('emailTypeSS', 'jessica.lechuga@eon.com.mx');
          this.router.navigate(['/inicio/autorizador']);
        });
    } else if (
      this.form.get('email')?.value
    ) {
      this.notiSvc
        .openSnackBar('Bienvenido a General de Seguros', 3000)
        .subscribe(() => {
          localStorage.setItem('userTypeSS', '1');
          localStorage.setItem('emailTypeSS', this.form.get('email')?.value);
          this.router.navigate(['/inicio/prospecto']);
        });
    } else {
      this.notiSvc
        .openSnackBar('Credenciales Incorrectas', 3000)
        .subscribe(() => (this.loading = false));
    }
  }

  onBuildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
