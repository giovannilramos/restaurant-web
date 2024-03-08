import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PageableDto } from '../../dto/PageableDto';
import { ProductQuery } from '../../dto/ProductQuery';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductDto } from '../../dto/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productQuery: FormGroup;

  constructor(private readonly http: HttpClient) {
    this.productQuery = new FormGroup({
      category: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(9),
      sort: new FormControl(null),
    });
  }

  listProducts(productQuery: ProductQuery): Observable<PageableDto<ProductDto>> {
    const queryParams = Object.keys(productQuery).reduce((accumulatedQueryParams: string, fieldKey: string) => {
      const fieldValue = productQuery[fieldKey as keyof typeof productQuery];

      if (fieldValue === null) {
        return accumulatedQueryParams;
      }

      const separator = accumulatedQueryParams === '' ? '' : '&';
      return `${accumulatedQueryParams}${separator}${fieldKey}=${fieldValue}`;
    }, '');

    return this.http.get<PageableDto<ProductDto>>(`${environment.apiUrl}/v1/product?${queryParams}`);
  }
}
