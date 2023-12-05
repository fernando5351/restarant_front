import { Component, OnInit,  ElementRef, Renderer2  } from '@angular/core';
import {FormGroup, Validators, FormBuilder,} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Combo } from 'src/app/models/combo.model';
import { Products } from 'src/app/models/product.model';
import { SaleInsert,SaleModel } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale/sale.service';

@Component({
  selector: 'app-patch',
  templateUrl: './patch.component.html',
  styleUrls: ['./patch.component.scss']
})
export class PatchComponent  implements OnInit{
  discountValue: number = 0;
  saleForm: FormGroup = new FormGroup({});
  show: boolean = true;
  showProd: boolean = false;
  saleId: number = 1;
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


  saleUp: SaleModel ={
    id: 0,
    client: '',
    waiter: '',
    total: 0,
    subTotal: 0,
    idMesa: 0,
    quantity: [],
    discount: 0,
    productIds: [],
    cellphone: 0,
    comboIds: [],
    comboQuantity: [],
    status: false,
    createdAt: '',
    SaleCombo: [],
    SaleProducts: []
  }

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
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.params.subscribe(params => {
      this.saleId = +params['id'];
      this.loadSaleData();
    })
  }


  loadSaleData() {
    this.saleService.getSaleById(this.saleId).subscribe({
      next: (saleData) => {
        this.saleUp = saleData;
        // Llenar el formulario con los datos de la venta
        this.saleForm.patchValue({
          client: saleData.client,
          mesero: saleData.waiter,
          discount: saleData.discount,
          subtotal: saleData.subTotal,
          total: saleData.total
          // ... Agrega otros campos según sea necesario
        });

        // Cargar productos y combos al arreglo existente o crear uno nuevo
        this.products = saleData.SaleProducts?.map((product) => ({
          id: product.id,
          name: product.name,
          categoryId: product.categoryId,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          status: product.status,
          imgUrl: product.imgUrl
        })) || [];

        this.combo = saleData.SaleCombo?.map((combo) => ({
          id: combo.id,
          name: combo.name,
          price: combo.price,
          imgUrl: combo.imgUrl,
          Product: combo.Product,
          status: combo.status
        })) || [];
        console.log(saleData);

      },
      error: (error: any) => {
        console.error(error);
        // Manejo de errores según tus necesidades
      }
    });
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

  // onProductClick(prod: any) {
  //   this.isSelectedProduct = true;
  //   console.log(prod);
  //   this.selectedProduct = {
  //     id: prod.id,
  //     name: prod.name,
  //     description: prod.description,
  //     price: prod.price,
  //     quantity: this.productQuantity,
  //     status: prod.status,
  //   };

  //   for (let i = 0; i < this.productsSelected.length; i++) {
  //     const id = this.productsSelected[i];

  //     if (id === prod.id) {
  //       // Si el ID del producto coincide con el ID del elemento seleccionado
  //       this.productsQuantity[i] += this.selectedProduct.quantity;
  //     } else {
  //       // Si el ID no coincide, simplemente asigna la cantidad del producto seleccionado
  //       this.productsQuantity[i] = this.selectedProduct.quantity;
  //     }

  //     console.log(this.productsQuantity[i] + ' prod quantity');
  //   }
  //   this.productsSelected.push(this.selectedProduct.id);
  //   this.productsQuantity.push(this.selectedProduct.quantity);
  //   this.product.push(this.selectedProduct);
  //   console.log(this.productsSelected);
  //   console.log(this.productsQuantity);

  //   setTimeout(() => {
  //     this.sale();
  //   }, 100);
  // }

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
    console.log(this.combos);
    console.log(this.combosQuantiy);

    setTimeout(() => {
      this.sale();
    }, 100);
  }

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

  deleteCombo(prod: any) {
    const newArray = this.comboSelected.filter((product: any) => product !== prod);
    this.comboSelected = newArray;

    let index = this.combo.findIndex((item) => item === prod.id);
    this.combo.splice(index, 1);

    let indexQuantity = this.combosQuantiy.findIndex((item) => item === prod.quantity);
    this.combosQuantiy.splice(indexQuantity, 1);

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

  descuentoDolares: number = 0;


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
    const waiter = this.saleForm.get('waiter')?.value;
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

    this.saleService.updateSale(this.saleId, dto).subscribe({
      next: (response) => {
        console.log(response);
        this.combos = [];
        this.combosQuantiy = [];
        this.productsSelected = [];
        this.productsQuantity = [];
        this.product = [];
        this.comboSelected = [];
        this.imprimirTicket(response.data);
        // Puedes reiniciar el formulario si es necesario
        this.saleForm.reset();
      },
      error: (error) => {
        console.log(error);
        // Manejo de errores según tus necesidades
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
    const waiter = this.saleForm.get('waiter')?.value;
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

    this.saleService.updateSale(this.saleId, dto).subscribe({
      next: (response) => {
        console.log(response);
        this.combos = [];
        this.combosQuantiy = [];
        this.productsSelected = [];
        this.productsQuantity = [];
        this.product = [];
        this.comboSelected = [];
        this.imprimirTicket(response.data);
        // Puedes reiniciar el formulario si es necesario
        this.saleForm.reset();
      },
      error: (error: any) => {
        console.log(error);
        // Manejo de errores según tus necesidades
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

    .info-container {
      width: var(--width);
      height: max-content;
      margin-top: 27px;
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
    <div class="info-container">
      <p>Telefono: 6860-9643</p>
      <p>Direccion: Col. La bendición, sobre la carretera, San Julian, Sonsonate</p>
      <p>Mesero: ${ventaInfo.waiter ? ventaInfo.waiter : ''}</p>
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
          <td>Total a pagar:</td>
          <td>$${ventaInfo.total}</td>
        </tr>
    </table>
    <div class="time-container">
      <p>Hora: ${hora} - ${day}/${month}/${year}</p>
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


