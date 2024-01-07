import { ItemDto } from './ItemDto';

export interface OrderDto {
  id: any;
  tableNumber: number;
  total: number;
  itemResponseList: ItemDto[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
