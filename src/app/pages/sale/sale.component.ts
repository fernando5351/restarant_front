import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { Combo } from 'src/app/models/combo.model';
import { Products } from 'src/app/models/product.model';
import { SaleInsert } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale/sale.service';
//import png from 'src/assets/bamboo.png';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  discountValue: number = 0;
  descuentoDolares: number = 0;
  saleForm: FormGroup = new FormGroup({});
  show: boolean = true;
  showProd: boolean = false;
  product:any = [];
  comboSelected: any = [];
  selectedProduct: any;
  isSelectedProduct: boolean = false;
  productQuantity: number = 1;
  comboQuantity: number = 1;

  img: any = '';

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
      status: '',
      categoryId: 0,
      imgUrl: null
    }],
    status: ''
  }];

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.saleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cellphone: [''],
      mesero: [''],
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

    let found = false;

    for (let i = 0; i < this.productsSelected.length; i++) {
      const id = this.productsSelected[i];

      if (id === prod.id) {
        this.productsQuantity[i] += this.selectedProduct.quantity;
        found = true;
        this.product[i].quantity = this.productsQuantity[i];
        break;
      }
    }

    if (!found) {
      this.productsSelected.push(this.selectedProduct.id);
      this.productsQuantity.push(this.selectedProduct.quantity);
      this.product.push(this.selectedProduct);
    }

    console.log(this.productsSelected);
    console.log(this.productsQuantity);

    setTimeout(() => {
      this.sale();
    }, 100);
  }

  onComboClick(prod: any) {
    this.isSelectedProduct = true;

    const selectedQuantity = this.comboQuantity || 1;

    this.selectedProduct = {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      quantity: selectedQuantity,  // Asegúrate de establecer un valor predeterminado
      status: prod.status,
    };

    let found = false;

    for (let i = 0; i < this.comboSelected.length; i++) {
      const selectedCombo = this.comboSelected[i];

      if (selectedCombo.id === prod.id) {
        // Verifica si el combo ya tiene una cantidad asignada
        if (selectedCombo.quantity !== null) {
          this.combosQuantiy[i] += selectedQuantity;
          selectedCombo.quantity = this.combosQuantiy[i];
        } else {
          // Si no tiene cantidad asignada, establece la cantidad
          selectedCombo.quantity = selectedQuantity;
        }
        found = true;
        break;
      }
    }

    if (!found) {
      this.comboSelected.push({
        id: prod.id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        quantity: selectedQuantity,
        status: prod.status,
      });
      this.combos.push(prod.id);
      this.combosQuantiy.push(selectedQuantity);
    }

    console.log(this.comboSelected);
    console.log(this.combosQuantiy);

    setTimeout(() => {
      this.sale();
    }, 100);
  }

  deleteCombo(prod: any) {
    const index = this.comboSelected.findIndex((product:any) => prod.id === prod.id);

    if (index !== -1) {
      const deletedCombo = this.comboSelected.splice(index, 1)[0];
      const comboIndex = this.combos.findIndex((item) => item === deletedCombo.id);
      this.combos.splice(comboIndex, 1);
      this.combosQuantiy.splice(comboIndex, 1);
    }

    setTimeout(() => {
      this.sale();
    }, 100);
  }


  // onComboClick(prod: any) {
  //   this.isSelectedProduct = true;
  //   this.selectedProduct = {
  //     id: prod.id,
  //     name: prod.name,
  //     description: prod.description,
  //     price: prod.price,
  //     quantity: this.comboQuantity,
  //     status: prod.status,
  //   };

  //   let found = false;

  //   console.log(this.comboSelected);

  //   for (let i = 0; i < this.combos.length; i++) {
  //     const id = this.combos[i];

  //     if (id === prod.id) {
  //       this.combosQuantiy[i] += this.selectedProduct.quantity;
  //       found = true;
  //       this.comboSelected[i].quantity = this.combosQuantiy[i];
  //       break;
  //     }
  //   }

  //   if (!found) {
  //     this.comboSelected.push(this.selectedProduct)
  //     this.combos.push(this.selectedProduct.id);
  //     this.combosQuantiy.push(this.selectedProduct.quantity);
  //   }

  //   console.log(this.combos);
  //   console.log(this.combosQuantiy);

  //   setTimeout(() => {
  //     this.sale();
  //   }, 100);
  // }

  delete(prod: any) {
    const newArray = this.product.filter((product: any) => product !== prod);

    let index = this.productsSelected.findIndex((item) => item === prod.id);
    this.productsSelected.splice(index, 1);

    let indexQuantity = this.productsQuantity.findIndex((item) => item === prod.quantity);
    this.productsQuantity.splice(indexQuantity, 1);

    this.product = newArray;
    setTimeout(() => {
      this.sale();
    }, 100);
  }

  // deleteCombo(prod: any) {
  //   const newArray = this.comboSelected.filter((product: any) => product !== prod);
  //   this.comboSelected = newArray;

  //   let index = this.combo.findIndex((item) => item === prod.id);
  //   this.combo.splice(index, 1);

  //   let indexQuantity = this.combosQuantiy.findIndex((item) => item === prod.quantity);
  //   this.combosQuantiy.splice(indexQuantity, 1);

  //   setTimeout(() => {
  //     this.sale();
  //   }, 100);
  // }

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

    if (discountValue > 0) {
      const totalValue = this.sale();
      const valueDiscount = totalValue * (discountValue / 100);
      this.descuentoDolares = valueDiscount;  // Almacena la cantidad de dólares descontados
      const totalPayment = totalValue - valueDiscount;
      this.saleForm.get('total')?.setValue('$' + totalPayment.toFixed(2));

      const changeisTrue = this.saleForm.get('paymentMethod')?.value;
      if (changeisTrue > 0) {
        change = changeisTrue - totalPayment;
        this.saleForm.get('change')?.setValue('$' + change.toFixed(2));
      }
    } else {
      this.descuentoDolares = 0;  // Si no hay descuento, establece la cantidad a cero
      this.sale();
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
    if (this.saleForm.get('subtotal')?.value == "$0.00") {
      alert("Hay posibles errores, como campos vacios");
      return;
    }

    const name = this.saleForm.get('name')?.value;
    const waiter = this.saleForm.get('mesero')?.value;
    const cellphone = Number(this.saleForm.get('cellphone')?.value);
    const discount = Number(this.saleForm.get('discount')?.value);
    let subTotal = (this.saleForm.get('subtotal')?.value);
    subTotal = subTotal.replace('$', '');
    subTotal = parseFloat(subTotal);
    let total = (this.saleForm.get('total')?.value);
    total = total.replace('$', '');
    total = parseFloat(total);

    const dto: SaleInsert = {
      client: name,
      waiter: waiter,
      total: total,
      subTotal,
      discount: discount,
      status: true,
      cellphone: cellphone,
      comboArray: this.combos,
      comboQuantity: this.combosQuantiy,
      productArray: this.productsSelected,
      quantity: this.productsQuantity
    }

    this.saleService.create(dto).subscribe({
      next: (response) => {
        console.log(response);
        this.combos = [];
        this.combosQuantiy = [];
        this.productsSelected = [];
        this.productsQuantity = [];
        this.product = [];
        this.comboSelected = [];
        this.imprimirTicket(response.data);
        this.saleForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          waiter:['',[Validators.required]],
          cellphone: [''],
          discount: [''],
          subtotal: ['', [Validators.required]],
          paymentMethod: [''],
          change: [''],
          total: ['', [Validators.required]],
        });
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  saleInStop(){
    if (this.saleForm.invalid) {
      alert("Hay posibles errores, como campos vacios");
      return;
    }
    if (this.saleForm.get('subtotal')?.value == "$0.00") {
      alert("Hay posibles errores, como campos vacios");
      return;
    }

    const name = this.saleForm.get('name')?.value;
    const waiter = this.saleForm.get('mesero')?.value;
    const cellphone = Number(this.saleForm.get('cellphone')?.value);
    const discount = Number(this.saleForm.get('discount')?.value);
    let subTotal = (this.saleForm.get('subtotal')?.value);
    subTotal = subTotal.replace('$', '');
    subTotal = parseFloat(subTotal);
    let total = (this.saleForm.get('total')?.value);
    total = total.replace('$', '');
    total = parseFloat(total);

    const dto: SaleInsert = {
      client: name,
      waiter: waiter,

      total: total,
      subTotal,
      discount: discount,
      status: false,
      cellphone: cellphone,
      comboArray: this.combos,
      comboQuantity: this.combosQuantiy,
      productArray: this.productsSelected,
      quantity: this.productsQuantity
    }

    this.saleService.create(dto).subscribe({
      next: (response) => {
        console.log(response);
        this.combos = [];
        this.combosQuantiy = [];
        this.productsSelected = [];
        this.productsQuantity = [];
        this.product = [];
        this.comboSelected = [];
        this.saleForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          cellphone: [''],
          mesero: ['',[Validators.required]],
          discount: [''],
          subtotal: ['', [Validators.required]],
          paymentMethod: [''],
          change: [''],
          total: ['', [Validators.required]],
        });
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

async imprimirTicket(ventaInfo: any) {

  const horaActual = new Date();
  const day = horaActual.getDate();
  const month = horaActual.getMonth();
  const year = horaActual.getFullYear();
  const horas = horaActual.getHours();
  const minutos = horaActual.getMinutes();

  const ampm = horas >= 12 ? 'PM' : 'AM';
  const horas12 = horas % 12 || 12;
  const hora = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${ampm}`;

  const doc = this.renderer.createElement('div');

  doc.innerHTML = `
  <style>
    :root {
      --width: 95%;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border: none;
      outline: none;
    }

    .ticket {
      width: 400px;
      height: max-content;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .img-sale-container {
      width: 100%;
      height: 100%;
    }

    .img-sale-container, img {
      width: 330px;
      height: 110px;
      margin-top: -60px;
    }

    .code-container {
      width: var(--width);
      height: max-content;
      margin-top: 27px;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .info-container {
      width: var(--width);
      height: max-content;
      margin-top: 1px;
      margin-bottom: 10px;
    }

    .client-container {
      width: var(--width);
      height: max-content;
      margin-bottom: 10px;
    }

    .sale-title {
      width: var(--width);
      height: max-content;
      display: flex;
      justify-content: center;
    }

    .table-sale {
      width: var(--width);
      border-collapse: collapse;
    }

    .thead-sale {
      font-weight: 500;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
    }

    th, td {
      width: 25%;
      text-align: left;
      vertical-align: top;
      padding: 8px;
      text-align: left;
    }

    .tbody-sale{
      border-bottom: 2px solid black;
    }

    .time-container {
      width: var(--width);
      height: max-content;
      margin-top: 25px;
    }
  </style>
  <div class="ticket">
    <div class="img-sale-container">
      <img src="/assets/bamboo.svg" style="width: 320px; height:320px">
    </div>
    <div class="code-container">
      <h3>${ventaInfo.code}</h3>
    </div>
    <div class="info-container">
      <p>Telefono: 6860-9643</p>
      <p>Direccion: Col. La bendición, sobre la carretera, San Julian, Sonsonate</p>
      <p>Mesero: ${ventaInfo.waiter ? ventaInfo.waiter : ''}</p>
    </div>
    <div class="client-container">
      <p>Cliente: ${ventaInfo.client}</p>
    </div>
    <div class="sale-title">
      <h4>Detalle de venta</h4>
    </div>
    <table class="table-sale">
        <thead class="thead-sale">
          <tr>
            <td>Cantidad</td>
            <td>Producto</td>
            <td>Total Gravado</td>
          </tr>
        </thead>
        <tbody class="tbody-sale">
            ${ventaInfo.SaleProducts.map((producto: any) => `
              <tr>
                <td>${producto.SaleProduct.quantity}</td>
                <td>${producto.name}</td>
                <td>$${(producto.price * producto.SaleProduct.quantity).toFixed(2)}</td>
              </tr>
            `)}
            ${ventaInfo.SaleCombo.map((producto: any) => `
              <tr>
                <td>${producto.SaleProduct.quantity}</td>
                <td>${producto.name}</td>
                <td>$${(producto.price * producto.SaleProduct.quantity).toFixed(2)}</td>
              </tr>
            `)}
        </tbody>
        <tr>
          <td></td>
          <td>Subtotal:</td>
          <td>$${ventaInfo.subTotal}</td>
        </tr>
        <tr>
          <td></td>
          <td>Descuento:</td>
          <td>$${this.descuentoDolares.toFixed(2)}</td>
        </tr>
        <tr>
          <td></td>
          <td>Total:</td>
          <td>$${ventaInfo.total}</td>
        </tr>
    </table>
    <div class="time-container">
      <p>Visita: ${hora} - ${day}/${month}/${year}</p>
    </div>
  </div>
  `;

  const body = this.el.nativeElement.ownerDocument.body;

  this.renderer.appendChild(body, doc);

  const ventanaEmergente = window.open('', 'about:blank', 'width=800,height=600');

  await ventanaEmergente?.document.write(doc.innerHTML.trimEnd());

  setTimeout(() => {
    ventanaEmergente?.print();
    ventanaEmergente?.close();
  }, 3500);
}

}
