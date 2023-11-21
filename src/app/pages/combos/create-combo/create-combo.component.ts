import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { GetProducts } from 'src/app/models/product.model';
import { CombosService } from '../../../services/combos/combos.service';
import { Subscription } from 'rxjs';
import { CreateCombo } from '../../../models/combo.model';

@Component({
  selector: 'app-create-combo',
  templateUrl: './create-combo.component.html',
  styleUrls: ['./create-combo.component.scss']
})
export class CreateComboComponent implements OnInit, OnDestroy {
  productsId: number[] = []
  products: GetProducts = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      description: '',
      categoryId: 0,
      price: 0,
      quantity: 0,
      status: '',
      imgUrl: null
    }]
  };

  comboForm: FormGroup = new FormGroup({});
  searchSubscription: Subscription = new Subscription()
  showResults: boolean = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private combosService: CombosService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  initializeForm() {
    this.comboForm = this.fb.group({
      comboName: ['', Validators.required],
      comboPrice: [0, Validators.required],
      selectedProduct: ['']
    });
  }

  search(name: string) {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    if (name.length >= 2) {
      this.searchSubscription = this.productService.search(name).subscribe((response) => {
        this.products.data = response.data;
      });
    }
    this.showResults = this.products.data.length > 0;
  }

  onSelectProduct(product: any) {
    const selectedProduct = this.comboForm.get('selectedProduct');

    const currentProducts: any[] = selectedProduct?.value || [];

    if (!currentProducts.some(p => p.id === product.id)) {
      currentProducts.push(product);
      selectedProduct?.setValue(currentProducts);
      this.productsId.push(product.id)
      console.log(this.productsId + ' Array de productos');
      console.log('Productos seleccionados:', this.comboForm.get('selectedProduct')?.value);
      console.log('Producto agregado al combo:', product);
    }
  }


  sendRequest(event: Event) {

    console.log('Datos del formulario:', this.comboForm.value);
    const comboData: CreateCombo = {
      name: this.comboForm.get('comboName')?.value,
      price: this.comboForm.get('comboPrice')?.value,
      status: 'true',
      Product: this.comboForm.get('selectedProduct')?.value || [],
    };

    const formData = new FormData();

    const productsIdString = this.productsId.join(',');
    // Agrega los campos del combo al FormData
    formData.append('name', comboData.name);
    formData.append('price', String(comboData.price));
    formData.append('status', comboData.status);
    formData.append('productIds', productsIdString);
    formData.forEach((value,key)=>{
      console.log("clave " + key + " valor " + value);
    })


     // Agrega los productos al FormData
    // for (let i = 0; i < comboData.Product.length; i++) {
    //   const product = comboData.Product[i];
    //   console.log('ID del producto:', product.id);
    //   formData.append(`Product[${i}].id`, String(product.id));
    //   formData.append(`Product[${i}].name`, product.name);
    //   // Agrega otros campos del producto según sea necesario
    // }



   // Envía el FormData al backend
    this.combosService.createCombo(formData).subscribe(
      (response: any) => {
        if (response) {
          console.log('Respuesta completa:', response);
          console.log(formData);
        } else {
          console.error('La respuesta del servidor no contiene el ID del combo:', response);
        }
      },
      (error: any) => {
        console.error('Error al crear el combo:', error);
      }
    );
   }

}
