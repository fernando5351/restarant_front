import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RecoveryPasswordComponent } from './pages/recoveryPassword/recovery-password.component';
import { CreateCategoryComponent } from './pages/category/create/create.component';
import { CreateProductComponent } from './pages/product/create/create.component';
import { UpdateComponent } from './pages/product/update/update.component';
import { GetComponent } from './pages/category/get/get.component';
import { GetByIdComponent } from './pages/category/get-by-id/get-by-id.component';
import  { PatchCategoryComponent } from './pages/category/patch-category/patch-category.component';
import { GetRoleComponent} from './pages/role/get-role/get-role.component';
import {CreateRoleComponent} from './pages/role/create-role/create-role.component';
import {GetTableComponent} from './pages/table/get-table/get-table.component';
import { GetProductComponent } from './pages/product/get/get.component';
import {CreateTableComponent} from './pages/table/create-table/create-table.component'
import { CreateUserComponent} from './pages/user/create-user/create-user.component'
import { GetUserComponent } from './pages/user/get-user/get-user.component';
import { CreateComboComponent } from './pages/combos/create-combo/create-combo.component';
import { GetComboComponent } from './pages/combos/get-combo/get-combo.component';
import {PatchComboComponent} from './pages/combos/patch-combo/patch-combo.component'


import { SaleComponent } from './pages/sale/sale.component';
import { GetSaleComponent } from './pages/sales/get/get.component';
import { PatchComponent } from './pages/sales/patch/patch.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: localStorage.getItem('token') ? '/home': '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent
  },
  {
    path:'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'update-product/:id',
    component: UpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-combo',
    component: CreateComboComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'combos',
    component: GetComboComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'combs/:id',
    component: PatchComboComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'category-create',
    component: CreateCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'categories',
    component: GetComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'product-create',
    component: CreateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: GetProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/:id',
    component: PatchCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products-category/:id',
    component: GetByIdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rol',
    component: GetRoleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-rol',
    component: CreateRoleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'table',
    component: GetTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-table',
    component: CreateTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: GetUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta',
    component: SaleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta/status/espera',
    component: GetSaleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta/continuar/:id',
    component: PatchComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
