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
import { GetComponent } from './pages/category/get/get.component';
import { GetByIdComponent } from './pages/category/get-by-id/get-by-id.component';
import  { PatchCategoryComponent } from './pages/category/patch-category/patch-category.component';
import { GetRoleComponent} from './pages/role/get-role/get-role.component';
import {CreateRoleComponent} from './pages/role/create-role/create-role.component';
import {GetTableComponent} from './pages/table/get-table/get-table.component';

import { GetProductComponent } from './pages/product/get/get.component';


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
    // canActivate: [AuthGuard]
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
