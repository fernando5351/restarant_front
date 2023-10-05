import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './components/category/category.component';

import { AuthInterceptor } from './interceptors/auth/auth';
import { LoadingComponent } from './components/loading/loading.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RecoveryPasswordComponent } from './pages/recoveryPassword/recovery-password.component';
import { GetComponent } from './pages/category/get/get.component';
import { CreateCategoryComponent } from './pages/category/create/create.component';
import { CreateProductComponent } from './pages/product/create/create.component';
import { ProductComponent } from './components/product/product.component';
import { GetProductComponent } from './pages/product/get/get.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    CategoryComponent,
    LoadingComponent,
    RecoveryComponent,
    RecoveryPasswordComponent,
    GetComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    ProductComponent,
    GetProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'Swal',
      useValue: Swal
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
