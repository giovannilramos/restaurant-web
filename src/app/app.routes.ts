import { Routes } from '@angular/router';
import { OrderListComponent } from './component/order/order-list/order-list.component';
import { LoginComponent } from './component/user/login/login.component';
import { authGuard } from './guard/auth.guard';
import { ProductsListComponent } from './component/products/products-list/products-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'order-list', component: OrderListComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'products', component: ProductsListComponent, pathMatch: 'full', canActivate: [authGuard] },
];
