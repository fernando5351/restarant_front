import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
import { CreateProductComponent } from './pages/category/create/create.component';

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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
