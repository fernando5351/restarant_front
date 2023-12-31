import { NgModule, LOCALE_ID } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

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
import { GetByIdComponent } from './pages/category/get-by-id/get-by-id.component';

import { ProductComponent } from './components/product/product.component';
import { GetProductComponent } from './pages/product/get/get.component';
import { PatchCategoryComponent } from './pages/category/patch-category/patch-category.component';
import { GetRoleComponent } from './pages/role/get-role/get-role.component';
import { CreateRoleComponent } from './pages/role/create-role/create-role.component';
import { GetTableComponent } from './pages/table/get-table/get-table.component';
import { CreateTableComponent } from './pages/table/create-table/create-table.component';
import { PatchTableComponent } from './pages/table/patch-table/patch-table.component';
import { RoleComponent } from './components/role/role.component';
import { TableComponent } from './components/table/table.component';
import { SaleComponentApi } from './components/sale/sale.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { GetUserComponent } from './pages/user/get-user/get-user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { UserComponent } from './components/user/user.component';
import { UpdateComponent } from './pages/product/update/update.component';
import { ComboComponent } from './components/combo/combo.component';
import { CreateComboComponent } from './pages/combos/create-combo/create-combo.component';
import { GetComboComponent } from './pages/combos/get-combo/get-combo.component';
import { GetSaleComponent } from './pages/sales/get/get.component';
import { SaleComponent } from './pages/sale/sale.component';
import { PrintSaleComponent } from './components/print-sale/print-sale.component';
import { PatchComboComponent } from './pages/combos/patch-combo/patch-combo.component';
import { PatchComponent } from './pages/sales/patch/patch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    GetByIdComponent,
    ProductComponent,
    GetProductComponent,
    PatchCategoryComponent,
    GetRoleComponent,
    CreateRoleComponent,
    GetTableComponent,
    CreateTableComponent,
    PatchTableComponent,
    HeaderComponent,
    ButtonsComponent,
    RoleComponent,
    TableComponent,
    HeaderComponent,
    GetUserComponent,
    CreateUserComponent,
    UserComponent,
    UpdateComponent,
    ComboComponent,
    CreateComboComponent,
    GetComboComponent,
    SaleComponent,
    PrintSaleComponent,
    PatchComboComponent,
    PatchComponent,
    GetSaleComponent,
    SaleComponentApi,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    {
      provide: 'Swal',
      useValue: Swal
    },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
