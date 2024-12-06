import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { OrderDto } from '../../dto/OrderDto';
import { ProductDto } from '../../dto/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly http: HttpClient) {
  }

  listOrder(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${environment.apiUrl}/v1/order`);
  }

  createOrder(productList: ProductDto[]): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/v1/order`, {
      items: productList.map(product => {
        return {
          quantity: product.quantity,
          productId: product.id,
          obs: product.obs,
        }
      })
    });
  }

  updateOrderStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/v1/order/${id}/status`, null);
  }
}
