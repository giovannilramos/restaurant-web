import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order/order.service';
import { OrderDto } from '../../dto/OrderDto';

@Component({
  selector: 'app-kitchen-page',
  standalone: true,
  imports: [],
  templateUrl: './kitchen-page.component.html',
  styleUrl: './kitchen-page.component.css'
})
export class KitchenPageComponent implements OnInit {

  orderList: OrderDto[] = [];

  constructor(private readonly orderService: OrderService) {
  }

  ngOnInit(): void {
    this.listOrder()
  }

  listOrder(): void {
    this.orderService.listOrder().subscribe({
      next: (value) => {
        this.orderList = value;
        console.log(value)
      },
      error: (err) => console.error(err)
    })
  }
}
