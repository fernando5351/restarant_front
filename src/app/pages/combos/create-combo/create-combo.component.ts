import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { GetProducts } from 'src/app/models/product.model';
import { CombosService } from '../../../services/combos/combos.service';
import { Subscription } from 'rxjs';
import { CreateCombo } from '../../../models/combo.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-combo',
  templateUrl: './create-combo.component.html',
  styleUrls: ['./create-combo.component.scss']
})
export class CreateComboComponent implements OnInit {
  productsId: number[] = [];
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
  showResults: boolean = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private combosService: CombosService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.initializeForm();
  }



  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  initializeForm() {
    this.comboForm = this.fb.group({
      comboName: ['', Validators.required],
      comboPrice: [, Validators.required],
      status: ['Estado', Validators.required],
      selectedProduct: ['']
    });
  }


  search(event: Event ) {
    const name = (event.target as HTMLInputElement).value;
    // console.log(name,' este es el name');
    if (name.length >=1) {
       this.productService.search(name).subscribe((response) => {
        const productosFiltrados = response.data
        this.products.data = productosFiltrados;
        this.showResults = this.products.data.length > 0;
      });
    } else {
      this.products.data = []
      this.showResults = false;
    }

  }


  onSelectProduct(product: any) {
    const selectedProduct = this.comboForm.get('selectedProduct');

    const currentProducts: any[] = selectedProduct?.value || [];

    if (!currentProducts.some((p) => p.id === product.id)) {
      currentProducts.push(product);
      selectedProduct?.setValue(currentProducts);
      this.productsId.push(product.id);
      // console.log(this.productsId + ' Array de productos');
      // console.log('Productos seleccionados:', this.comboForm.get('selectedProduct')?.value);
      // console.log('Producto agregado al combo:', product);
    }
  }

  onRemoveProduct(product: any) {
    const selectedProduct = this.comboForm.get('selectedProduct');

    const currentProducts: any[] = selectedProduct?.value || [];

    const updatedProducts = currentProducts.filter((p) => p.id !== product.id);

    selectedProduct?.setValue(updatedProducts);
    this.productsId = updatedProducts.map((p) => p.id);

    // console.log('Producto eliminado del combo:', product);
    console.log('Productos seleccionados:', this.comboForm.get('selectedProduct')?.value);
  }

  sendRequest(event: Event) {
    // console.log('Datos del formulario:', this.comboForm.value);
    const comboData: CreateCombo = {
      name: this.comboForm.get('comboName')?.value,
      price: this.comboForm.get('comboPrice')?.value,
      status: 'true',
      Product: this.comboForm.get('selectedProduct')?.value || [],
    };

    const formData = new FormData();

    const productsIdString = this.productsId.join(',');
    formData.append('name', comboData.name);
    formData.append('price', String(comboData.price));
    formData.append('status', comboData.status);
    formData.append('productIds', productsIdString);

    this.combosService.createCombo(formData).subscribe(
      (response: any) => {
        if (response.statusCode = 201) {
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Combo creado con exito',
          showCancelButton: true
         })
        }
         else {
          console.error('La respuesta del servidor no contiene el ID del combo:', response);
        }
        this.router.navigate(['/combos'])
      },
      (error: any) => {
        if (error.status = 400) {
          Swal.fire({
            position: 'center',
            title: 'Algo salio mal, verifica que envias los datos correctamente',
            icon: 'warning',
            timer: 2000
          })
        }
      }
    );
  }
}
