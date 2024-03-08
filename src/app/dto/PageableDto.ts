export interface PageableDto<T> {
  first: boolean;
  last: boolean;
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
