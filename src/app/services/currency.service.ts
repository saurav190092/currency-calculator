import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(@Inject('apiUrl') private apiUrl:any, private http: HttpClient) {}

  getCurrency() {
    return this.http.get(`${this.apiUrl}`);
  }
}
