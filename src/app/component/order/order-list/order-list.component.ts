import { Component, OnInit } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { OrderService } from '../../../service/order/order.service';
import { OrderDto } from '../../../dto/OrderDto';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    PickListModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orderList: OrderDto[] = []
  constructor(private readonly orderService: OrderService) {
  }

  ngOnInit(): void {
      this.listOrder();
    }

  public listOrder() {
    this.orderService.listOrder().subscribe(value => this.orderList = value);
  }
}
