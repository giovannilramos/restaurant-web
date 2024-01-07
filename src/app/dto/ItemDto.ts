import {ProductDto} from "./ProductDto";

export interface ItemDto {
  id: any;
  quantity: number;
  subTotal: number;
  obs: string;
  productResponse: ProductDto;
}
