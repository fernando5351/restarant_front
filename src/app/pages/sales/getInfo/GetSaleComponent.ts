import { Component, OnInit,  ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { Combo, OneCombo } from 'src/app/models/combo.model';
import { GetAProduct, GetProducts, Products } from 'src/app/models/product.model';
import { SaleGet, SaleInsert } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale/sale.service';
import { SaleResponse } from 'src/app/models/saleUpdate.Model';

@Component({
  selector: 'app-patch',
  templateUrl: './GetSaleComponent.html',
  styleUrls: ['./GetSaleComponent.scss']
})
export class GetInfoSaleComponent implements OnInit {
  discountValue: number = 0;
  descuentoDolares: number = 0;
  saleForm: FormGroup = new FormGroup({});
  show: boolean = true;
  showProd: boolean = false;
  product: GetAProduct[] = [{
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    categoryId: 0,
    status: 'false',
    imgUrl: null,
  }];
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

  productObject: Products = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    categoryId: 0,
    status: 'false',
    imgUrl: null
  };

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
      imgUrl: null,
      SaleProduct: {
        saleId: 0,
        comboId: 0,
        productId: 0,
        quantity: 0,
      }
    }],
    status: ''
  }];

  selectedCombo = {
    id: 0,
    name: '',
    price: 0,
    imgUrl: '',
    SaleProduct: {
      saleId: 0,
      comboId: 0,
      productId: 0,
      quantity: 0,
    },
    status: ''
  };

  saleResponse!: SaleResponse;
  idSale: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private el: ElementRef,
    private renderer: Renderer2,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.idSale = id;
    });
    this.requestGet(this.idSale);

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
  }

  requestGet(id: number){
    this.saleService.GetSaleById(id).subscribe({
      next: (response) => {
        this.saleResponse = response;
        this.product = [];
        this.saleForm = this.formBuilder.group({
          name: [this.saleResponse.data.client, [Validators.required]],
          cellphone: [this.saleResponse.data.cellphone],
          mesero: [this.saleResponse.data.waiter],
          discount: [this.saleResponse.data.discount],
          subtotal: [this.saleResponse.data.subTotal, [Validators.required]],
          paymentMethod: [''],
          change: [''],
          total: [this.saleResponse.data.total, [Validators.required]],
        });

        if (this.saleResponse.data.SaleProducts) {
          for (let i = 0; i < this.saleResponse.data.SaleProducts.length; i++) {

            const id = this.saleResponse.data.SaleProducts[i].id;
            let quantity = this.saleResponse.data.SaleProducts[i].SaleProduct?.quantity;
            quantity = Number(quantity);
            const product = this.saleResponse.data.SaleProducts[i];

            this.productsSelected.push(id);
            this.productsQuantity.push(quantity);
            console.log(this.productsQuantity);
            console.log('soy quantity');

            let productObject = {
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,
              imgUrl: product.imgUrl,
              status: product.status,
              quantity: quantity,
              categoryId: product.categoryId
            }
            this.product.push(productObject);
          }
        }
        let comboArray = this.saleResponse.data.SaleCombo? this.saleResponse.data.SaleCombo : [];
        console.log(comboArray);
        this.comboSelected = [];
        if (comboArray.length > 0) {
          console.log('estoy dentro de length de combo');
          if (this.saleResponse.data.SaleCombo) {
            for (let i = 0; i < this.saleResponse.data.SaleCombo.length; i++) {
              const id = this.saleResponse.data.SaleCombo[i].id;
              this.combos.push(id);
            }
            for (let combo of this.saleResponse.data.SaleCombo) {
              console.log('esty en for de combo');
              console.log(combo);

                let comboSale = combo.SaleProduct;
                console.log(comboSale);
                console.log('estoy en for combo.product');


                let quantity = combo.SaleProduct?.quantity;
                quantity = Number(quantity);

                this.combosQuantiy.push(quantity);

                let selectedCombo = {
                  id: combo.id,
                  name: combo.name,
                  price: combo.price,
                  imgUrl: combo.imgUrl,
                  status: combo.status,
                  quantity: combo.SaleProduct?.quantity,
                  SaleProduct: {
                    saleId: combo.SaleProduct.saleId,
                    comboId: combo.SaleProduct.comboId,
                    productId: combo.SaleProduct.productId,
                    quantity: combo.SaleProduct?.quantity,
                  }
                }
                console.log(selectedCombo);
                console.log(selectedCombo);

                this.comboSelected.push(selectedCombo)
            }
          }
          console.log(this.comboSelected);
        }

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  back(){
    this.router.navigate(['venta/status/espera']);
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
