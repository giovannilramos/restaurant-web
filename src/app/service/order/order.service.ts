import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { OrderDto } from '../../dto/OrderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly http: HttpClient) {
  }

  public listOrder(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${environment.apiUrl}/v1/order`);
  }
}
