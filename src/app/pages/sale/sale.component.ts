import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
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

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.saleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      subtotal: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      change: ['', [Validators.required]],
      total: ['', [Validators.required]],
    });
    this.sale();
  }

  saleProduct(event: Event) {
    const name = (event.target as HTMLInputElement).value;
    console.log(name);
    this.saleService.search(name, true).subscribe({
      next: Response => {
        let prod = Response.data;
        console.log(prod);
        this.showProd = true;
      },
      error: error => {
        console.log(error);
      }
    })
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
    this.saleForm.get('subtotal')?.setValue('$' + total);
    this.saleForm.get('total')?.setValue('$' + total);
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
      console.log(count);

      if (count > 0) {
        changeVal = changeValue - count;
      } else {
        changeVal = changeValue - paymentVal;
      }
      this.saleForm.get('change')?.setValue('$' + changeVal.toFixed(2));
    } else {
      this.discount();
      this.saleForm.get('change')?.setValue('$' + changeVal.toFixed(2));
    }
    return changeVal;
  }
}
