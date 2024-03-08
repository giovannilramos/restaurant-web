import { Component } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../service/product/cart.service';
import { ProductDto } from '../../dto/ProductDto';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogClose } from '@angular/material/dialog';
import { OrderService } from '../../service/order/order.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    NgForOf,
    CurrencyPipe,
    MatDividerModule,
    MatDialogClose,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  productList: ProductDto[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly messageService: MessageService
  ) {
  }

  showCartItems(sidenav: MatSidenav) {
    this.productList = this.cartService.listCartItems();
    sidenav.toggle().then();
  }

  showCartItemsQuantity(): number {
    return this.cartService.cartItemsQuantity();
  }

  removeItem(product: ProductDto): void {
    this.cartService.removeItem(product);
  }

  createOrder(productList: ProductDto[], sidenav: MatSidenav): void {
    this.orderService.createOrder(productList).subscribe(_ => {
      this.cartService.clearItems();
      sidenav.toggle().then();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your order was sent to prepare!' });
    });
  }
}
