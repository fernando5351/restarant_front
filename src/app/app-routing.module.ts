import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { RecoveryPasswordComponent } from './pages/recoveryPassword/recovery-password.component';
import { CreateProductComponent } from './pages/category/create/create.component';

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
    path:'categories',
    component: CategoryComponent
  },
  {
    path:'product-create',
    component: CreateProductComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
