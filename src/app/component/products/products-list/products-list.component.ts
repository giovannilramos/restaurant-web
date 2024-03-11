import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { ProductDto } from '../../../dto/ProductDto';
import { CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from '../../cart/cart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { ProductQuery } from '../../../dto/ProductQuery';
import { NavigationButtonComponent } from '../navigation-button/navigation-button.component';
import { PageableDto } from '../../../dto/PageableDto';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    RouterLink,
    MatBadgeModule,
    MatIconModule,
    CartComponent,
    MatSidenavModule,
    MatDividerModule,
    NavigationButtonComponent,
    NgIf,
    MatTooltipModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  products!: ProductDto[];
  pageableProducts: PageableDto<ProductDto> = {
    content: [],
    last: false,
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: false
  };

  constructor(
    public productService: ProductService,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.listProducts(this.productService.productQuery.value);
  }

  filterProducts(category: string, value: any): void {
    this.productService.productQuery.get(category)?.setValue(value);
    this.productService.productQuery.get('page')?.setValue(0);
    this.listProducts(this.productService.productQuery.value)
  }

  listProducts(productQuery: ProductQuery): void {
    this.productService.listProducts(productQuery).subscribe({
      next: (value) => {
        this.pageableProducts = value;
      },
    });
  }

  openDetailsModal(product: ProductDto): void {
    this.dialog.open(ProductDetailComponent, {
      width: '90vw',
      height: '95vh',
      data: product,
      autoFocus: false
    })
  }
}
