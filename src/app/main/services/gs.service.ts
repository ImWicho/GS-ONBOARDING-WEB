import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GsService {
  private infoIne = new Subject<any>();
  constructor(private http: HttpClient) { }

  get infoIne$(): Subject<void>{
    return this.infoIne;
  }

  getPayments(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/payments/`);
  }

  getDocuments(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/documents/`);
  }

  getProducts(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/products/`);
  }

  getStatus(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/statuses/`);
  }

  async saveClient(data: any): Promise<any>{
    return this.http.post<any>(`${environment.apiUrl}/clients/`, data).toPromise();
  }

  getClients(params: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/clients/?name=${params.name ? params.name :''}
    &ine=${params.ine ? params.ine : ''}
    &curp=${params.curp ? params.curp :''}
    &rfc=${params.rfc ? params.rfc : ''}`);
  }
  getClientsAuthorizing(params: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/clients/authorizing/?name=${params.name ? params.name :''}
    &ine=${params.ine ? params.ine : ''}
    &curp=${params.curp ? params.curp :''}
    &rfc=${params.rfc ? params.rfc : ''}`);
  }

  async getDocument(filePath: string): Promise<any>{
    return this.http.get<any>(`${environment.apiUrl}/documents/file/?file_path=${filePath}`).toPromise();
  }

  async uploadDocument(data: any): Promise<any>{
    return this.http.post<any>(`${environment.apiUrl}/documents/file/`, data).toPromise();
  }

  getClient(id: number): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/clients/${id}/`);
  }

  async updateClient(data: any): Promise<any>{
    return this.http.patch<any>(`${environment.apiUrl}/clients/${data.id}/`, data).toPromise();
  }

  getProspects(email: string | null, data: any): Observable<any>{
    return this.http.get<any>
      (`${environment.apiUrl}/prospects/${email}/?application_number=${data.application_number ? data.application_number : ''}
      &product_name=${data.product_name ? data.product_name : ''}
      ${data.start_date ? '&start_date=' + data.start_date : ''}
      ${data.end_date ? '&end_date=' + data.end_date : ''}`);
  }

  async getName(image: File): Promise<any>{
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<any>(`${environment.ocrApiUrl}/name`,formData).toPromise();
  }

  async getAddress(image: File): Promise<any>{
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<any>(`${environment.ocrApiUrl}/address`,formData).toPromise();
  }
}
