import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SemiService {
  private http = inject(HttpClient);
  private apiURL = environment.apiURL + '/Semi';

  constructor() {}

  GetPatients() {
    return this.http.get(`${this.apiURL}/GetPatients`);
  }

  GetOrders() {
    return this.http.get(`${this.apiURL}/GetOrders`);
  }

  CreateOrder(order: any) {
    return this.http.post(`${this.apiURL}/CreateOrder`, order);
  }

  GetExams() {
    return this.http.get(`${this.apiURL}/GetExams`);
  }
}
