import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Combo } from 'src/app/models/combo.model';
import { Products } from 'src/app/models/product.model';
import { SaleInsert } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  discountValue: number = 0;
  saleForm: FormGroup = new FormGroup({});
  show: boolean = true;
  showProd: boolean = false;
  product:any = [];
  comboSelected: any = [];
  selectedProduct: any;
  isSelectedProduct: boolean = false;
  productQuantity: number = 1;

  combos: number[] = [];
  combosQuantiy: number[] = [];
  productsSelected: number[] = [];
  productsQuantity: number[] = [];

  products: Products[] = [{
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    categoryId: 0,
    status: 'false',
    imgUrl: null
  }];
  combo: Combo[] = [{
    id: 0,
    name: '',
    price: 0,
    imgUrl: null,
    Product: [{
      id: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      status: false,
      categoryId: 0
    }],
    status: ''
  }];

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.saleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cellphone: [''],
      discount: [''],
      subtotal: ['', [Validators.required]],
      paymentMethod: [''],
      change: [''],
      total: ['', [Validators.required]],
    });
    this.sale();
  }

  quantity(event: Event) {
    const quantityElement = (event.target as HTMLInputElement).value;
    this.productQuantity = Number(quantityElement);
  }

  onProductClick(prod: any) {
    this.isSelectedProduct = true;
    console.log(prod);
    this.selectedProduct = {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      quantity: this.productQuantity,
      status: prod.status,
    };
    this.productsSelected.push(this.selectedProduct.id);
    this.productsQuantity.push(this.selectedProduct.quantity);
    this.product.push(this.selectedProduct);

    setTimeout(() => {
      this.sale();
    }, 100);
  }

  onComboClick(prod: any) {
    this.isSelectedProduct = true;
    this.selectedProduct = {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      quantity: this.productQuantity,
      status: prod.status,
    };
    this.comboSelected.push(this.selectedProduct)
    this.combos.push(this.selectedProduct.id);
    this.combosQuantiy.push(this.selectedProduct.quantity);

    setTimeout(() => {
      this.sale();
    }, 100);
  }

  delete(prod: any) {
    const newArray = this.product.filter((product: any) => product !== prod);

    this.productsSelected.push(this.selectedProduct.id);
    this.productsQuantity.push(this.selectedProduct.quantity);

    this.product = newArray;
    setTimeout(() => {
      this.sale();
    }, 100);
  }

  deleteCombo(prod: any) {
    const newArray = this.comboSelected.filter((product: any) => product !== prod);
    this.comboSelected = newArray;

    console.log(prod);
    let newCombos = this.combos.filter((getCombo: any) => getCombo.id !== prod.id);
    console.log(newCombos + ' => new combos id');
    console.log(this.combos + ' => combos id');
    this.combos = newCombos;

    let newCombosQuantity = this.combosQuantiy.filter((getCombo: any) => getCombo.id !== prod.quantity);
    console.log(newCombosQuantity + ' => new combos qantity');
    console.log(this.combosQuantiy + ' => combos qantity');
    this.combosQuantiy = newCombosQuantity;

    setTimeout(() => {
      this.sale();
    }, 100);
  }

  saleProduct(event: Event) {
    const name = (event.target as HTMLInputElement).value;
    console.log(name);
    if (name.length >= 1) {
      this.saleService.search(name, true).subscribe({
        next: Response => {
          let prod = Response.data;
          this.products = prod[1];
          this.combo = prod[0];
          this.showProd = true;
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      this.showProd = false;
    }
  }

  sale(){
    let total: number = 0;
    let quantity: number = 0;
    let price: number = 0;

    const prod = document.querySelectorAll('.sale-content');

    prod.forEach((element) => {
      const quantityElement = element.querySelector('#quantity')?.textContent;
      const priceElement = element.querySelector('#price')?.textContent;


      if (quantityElement !== undefined &&  quantityElement !== null){
        quantity = parseInt(quantityElement, 10);
      }if (priceElement !== undefined && priceElement !== null) {
        price = parseFloat(priceElement.replace('$', ''));
      }
      console.log( '=> cantidad ' + quantity);
      console.log( '=> price ' + price);
      total += price * quantity;
      console.log( '=> total ' + total);
    })

    console.log('Total a pagar:', total);
    this.saleForm.get('subtotal')?.setValue('$' + total.toFixed(2));
    this.saleForm.get('total')?.setValue('$' + total.toFixed(2));
    return total;
  }

  discount() {
    let change: number = 0;
    let discountValue = Number(this.saleForm.get('discount')?.value);
    console.log(discountValue);
    if (discountValue > 0) {
      const totalValue = this.sale();
      const valueDiscount = totalValue * (discountValue / 100);
      const totalPayment = totalValue - valueDiscount;
      this.saleForm.get('total')?.setValue('$' + totalPayment.toFixed(2));
      console.log(valueDiscount.toFixed(2));
      const changeisTrue = this.saleForm.get('paymentMethod')?.value;

      if (changeisTrue > 0) {
        change = changeisTrue - totalPayment;
        this.saleForm.get('change')?.setValue('$' + change.toFixed(2));
      }
    } else {
      this.sale();
      return change;
    }
    return change;
  }

  changePayment() {
    let changeVal:number = 0;
    let changeValue = this.saleForm.get('paymentMethod')?.value;
    console.log(changeValue + ' => change value');
    if (changeValue > 0) {
      const paymentVal = this.sale();
      let count: number = this.discount();
      console.log(count + ' => discount()');
      console.log(paymentVal + ' => sale()');

      if (count > 0) {
        console.log('count esta dentro del if');
        changeVal = changeValue - count;
        changeVal = changeValue - changeVal;
        console.log(changeVal + ' => valor de changeValue');

      } else {
        console.log('count esta fuera del if');
        changeVal = changeValue - paymentVal;
      }
      this.saleForm.get('change')?.setValue('$' + changeVal.toFixed(2));
    } else {
      this.discount();
      this.saleForm.get('change')?.setValue('$' + changeVal.toFixed(2));
    }
    return changeVal;
  }

  sendRequest(){
    if (this.saleForm.invalid) {
      alert("Hay posibles errores, como campos vacios");
      return;
    }

    const name = this.saleForm.get('name')?.value;
    const cellphone = this.saleForm.get('cellphone')?.value;
    const discount = this.saleForm.get('discount')?.value;
    const subtotal = this.saleForm.get('subtotal')?.value;
    const paymentMethod = this.saleForm.get('paymentMethod')?.value;
    const change = this.saleForm.get('change')?.value;
    const total = this.saleForm.get('total')?.value;

    const dto: SaleInsert = {
      client: name,
      total: total,
      discount: discount,
      status: true,
      cellphone: cellphone,
      comboIds: this.combos,
      comboQuantity: this.combosQuantiy,
      productIds: this.productsSelected,
      quantity: this.productsQuantity
    }

    console.log(dto);

    this.saleService.create(dto).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
}
