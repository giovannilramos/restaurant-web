import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { ProductService } from '../../../service/product/product.service';

@Component({
  selector: 'app-navigation-button',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgClass
  ],
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.css'
})
export class NavigationButtonComponent {
  @Input() direction: 'right' | 'left' = 'right';
  @Input() sideButton: 'rightButton' | 'leftButton' = 'leftButton';
  @Output() onChange = new EventEmitter<void>();

  constructor(private readonly productService: ProductService) {
  }

  changePage(side: string): void {
    const page = this.productService.productQuery.get('page');
    if (side === 'right') {
      page?.setValue(page?.value + 1);
      this.onChange.emit();
      return;
    }
    if (page?.value > 0) {
      page?.setValue(page?.value - 1);
      this.onChange.emit();
    }
  }
}
