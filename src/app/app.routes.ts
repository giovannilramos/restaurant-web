import { Routes } from '@angular/router';
import { OrderListComponent } from './component/order/order-list/order-list.component';
import { LoginComponent } from './component/user/login/login.component';
import { authGuard } from './guard/auth.guard';
import { ProductsListComponent } from './component/products/products-list/products-list.component';
import { AddProductComponent } from './component/products/add-product/add-product.component';
import { loggedGuard } from './guard/logged.guard';
import { KitchenPageComponent } from './component/kitchen-page/kitchen-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [loggedGuard] },
  { path: 'order-list', component: OrderListComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'products', component: ProductsListComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'add-products', component: AddProductComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'kitchen', component: KitchenPageComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'admin', component: KitchenPageComponent, pathMatch: 'full', canActivate: [authGuard] },
];
