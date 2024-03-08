import { Component } from '@angular/core';
import { ProductDto } from '../../../dto/ProductDto';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    InputMaskModule,
    InputNumberModule,
    FormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: ProductDto = {
    quantity: 0,
    description: '',
    image: '',
    name: '',
    price: 0,
    status: true,
    subTotal: 0,
    obs: ''
  };
}
