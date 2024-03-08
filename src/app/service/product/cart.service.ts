import { Injectable } from '@angular/core';
import { ProductDto } from '../../dto/ProductDto';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly productList: ProductDto[] = [];
  cartForm: FormGroup;

  constructor() {
    this.productList = JSON.parse(sessionStorage.getItem('items') ?? '[]');
    this.cartForm = new FormGroup({
      obs: new FormControl(null)
    });
  }

  addItem(product: ProductDto): void {
    const productItem = { ...product }
    const productExistent = this.productList.find(item => item.id === productItem.id && !item.obs);
    if (productExistent && !productItem.obs) {
      productExistent.quantity += productItem.quantity;
      this.syncItems();
      return;
    }

    this.productList.push(productItem);
    this.syncItems();
  }

  removeItem(product: ProductDto): void {
    const index = this.productList.indexOf(product);
    this.productList.splice(index, 1);
    this.syncItems();
  }

  listCartItems(): ProductDto[] {
    return this.productList;
  }

  cartItemsQuantity(): number {
    return this.productList.reduce((previousValue: number, currentValue: ProductDto) => {
      return previousValue + currentValue.quantity;
    }, 0);
  }

  syncItems(): void {
    sessionStorage.setItem('items', JSON.stringify(this.productList));
  }

  clearItems() {
    this.productList.splice(0, this.productList.length);
    this.syncItems();
  }
}
