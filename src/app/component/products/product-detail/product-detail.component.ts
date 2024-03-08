import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductDto } from '../../../dto/ProductDto';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../../../service/product/cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CurrencyPipe,
    MatIconModule,
    ButtonModule,
    RippleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  quantity: number = 1;
  disabled: boolean = true;

  constructor(
    private readonly messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public product: ProductDto,
    public cartService: CartService,
  ) {
  }


  removeQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.disabled = this.quantity <= 1;
    }
  }

  addQuantity(): void {
    this.quantity++;
    this.disabled = this.quantity <= 1;
  }

  addToCard(product: ProductDto, quantity: number): void {
    product.quantity = quantity;
    product.subTotal = product.quantity * product.price;
    product.obs = this.cartService.cartForm.get('obs')?.value;
    this.cartService.addItem(product);
    this.cartService.cartForm.get('obs')?.setValue(null);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added to you bag!' });
  }
}
