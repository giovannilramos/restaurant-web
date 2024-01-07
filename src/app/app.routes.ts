import { Routes } from '@angular/router';
import { OrderListComponent } from './order/order-list/order-list.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'order-list', component: OrderListComponent, pathMatch: 'full' },
];
