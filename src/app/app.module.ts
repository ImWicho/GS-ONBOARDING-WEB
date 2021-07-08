import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { traduccionAEspaniolPaginatorIntl } from './shared/modules/traduction';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: traduccionAEspaniolPaginatorIntl() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
