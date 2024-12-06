import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order/order.service';
import { OrderDto } from '../../dto/OrderDto';
import { DragDropModule } from 'primeng/dragdrop';
import { NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-kitchen-page',
  standalone: true,
  imports: [
    DragDropModule,
    NgForOf,
    MatCardModule,
    NgIf
  ],
  templateUrl: './kitchen-page.component.html',
  styleUrl: './kitchen-page.component.css'
})
export class KitchenPageComponent implements OnInit {

  todoOrderList: OrderDto[] = [];
  doingOrderList: OrderDto[] = [];
  finishedOrderList: OrderDto[] = [];
  draggedOrder: OrderDto | undefined | null;

  constructor(private readonly orderService: OrderService) {
  }

  ngOnInit(): void {
    this.listOrder()
  }

  listOrder(): void {
    this.orderService.listOrder().subscribe({
      next: (orderList) => {
        this.todoOrderList = orderList.filter(order => order.status === 'REQUESTED');
        this.doingOrderList = orderList.filter(order => order.status === 'PREPARING');
        this.finishedOrderList = orderList.filter(order => order.status === 'FINISHED');
      },
      error: (err) => console.error(err)
    })
  }

  dragStart(order: OrderDto) {
    this.draggedOrder = order;
  }

  drop() {
    if (this.draggedOrder && !this.doingOrderList.find(value => value.id === this.draggedOrder?.id)) {
      let draggedProductIndex = this.findIndex(this.draggedOrder);
      this.doingOrderList = [...this.doingOrderList, this.draggedOrder];
      this.todoOrderList = this.todoOrderList?.filter((_, i) => i != draggedProductIndex);
      this.updateOrderStatus(this.draggedOrder.id);
      this.draggedOrder = null;
    }
  }

  drop2() {
    if (this.draggedOrder) {
      let draggedProductIndex = this.findIndex2(this.draggedOrder);
      this.finishedOrderList = [...this.finishedOrderList, this.draggedOrder];
      this.doingOrderList = this.doingOrderList?.filter((_, i) => i != draggedProductIndex);
      this.updateOrderStatus(this.draggedOrder.id);
      this.draggedOrder = null;
    }
  }

  dragEnd() {
    this.draggedOrder = null;
  }

  findIndex(order: OrderDto) {
    let index = -1;
    for (let i = 0; i < this.todoOrderList.length; i++) {
      if (order.id === this.todoOrderList[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  findIndex2(order: OrderDto) {
    let index = -1;
    for (let i = 0; i < this.doingOrderList.length; i++) {
      if (order.id === this.doingOrderList[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  updateOrderStatus(id: number): void {
    this.orderService.updateOrderStatus(id).subscribe();
  }

}
