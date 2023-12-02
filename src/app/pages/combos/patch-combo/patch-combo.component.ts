import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { GetProducts } from 'src/app/models/product.model';
import {GetCombos} from '../../../models/combo.model';
import { CombosService } from '../../../services/combos/combos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCombo } from '../../../models/combo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-combo',
  templateUrl: './patch-combo.component.html',
  styleUrls: ['../create-combo/create-combo.component.scss'] // Utiliza los mismos estilos que create
})
export class PatchComboComponent implements OnInit {
  productsId: number[] = [];
  comboId: number = 0;
  products: GetProducts = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name: '',
        description: '',
        categoryId: 0,
        price: 0,
        quantity: 0,
        status: '',
        imgUrl: null
      }
    ]
  };

  getCombos: GetCombos = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      status: '',
      price: 0,
      Product: [
        {
        id: 0,
        name: '',
        description: '',
        status: '',
        price: 0,
        quantity: 0,
        imgUrl: null,
        categoryId: 0,
      }
    ]
    }]
  }

  getCategories(){
    this.combosService.getCombos().subscribe((data)=>{
      this.getCombos = data
      console.log(this.getCombos.data);
    })
  }

  comboForm: FormGroup = new FormGroup({});
  showResults: boolean = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private combosService: CombosService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getCategories()
    this.route.params.subscribe((params) => {
      this.comboId = params['id'];
      this.loadComboData();
    });
  }



        loadComboData() {
          this.combosService.getComboById(this.comboId).subscribe((combo) => {
            this.comboForm.patchValue({
              comboName: combo.data.name,
              comboPrice: combo.data.price,
              status: combo.data.status,
              selectedProduct: combo.data.Product
            });
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

  search(event: Event) {
    const name = (event.target as HTMLInputElement).value;

    if (name.length >= 1) {
      this.productService.search(name).subscribe((response) => {
        const productosFiltrados = response.data;
        this.products.data = productosFiltrados;
        this.showResults = this.products.data.length > 0;
      });
    } else {
      this.products.data = [];
      this.showResults = false;
    }
  }

  onSelectProduct(product: any) {
    const selectedProduct = this.comboForm.get('selectedProduct')!;
    const currentProducts: any[] = selectedProduct.value || [];

    if (!currentProducts.some((p) => p.id === product.id)) {
      currentProducts.push(product);
      this.comboForm.patchValue({
        selectedProduct: currentProducts
      });
      console.log('Productos seleccionados:', currentProducts);
      console.log('Producto agregado al combo:', product);
    }
  }


  onRemoveProduct(product: any) {
    const selectedProduct = this.comboForm.get('selectedProduct')!;
    const currentProducts: any[] = selectedProduct.value || [];

    const updatedProducts = currentProducts.filter((p) => p.id !== product.id);

    this.comboForm.patchValue({
      selectedProduct: updatedProducts
    });

    console.log('Producto eliminado del combo:', product);
    console.log('Productos seleccionados:', updatedProducts);
  }


  sendRequest(event: Event) {
    const comboData: UpdateCombo = {
      name: this.comboForm.get('comboName')?.value,
      price: this.comboForm.get('comboPrice')?.value,
      status: this.comboForm.get('status')?.value,
      products: this.comboForm.get('selectedProduct')?.value || [],
    };

    const formData = new FormData();

    if (comboData.products) {
      const productsIdArray = comboData.products.map((product: any) => product.id);
      productsIdArray.forEach((productId) => {
        formData.append('productIds', String(productId));
      });
    }

    formData.append('name', comboData.name || '');
    formData.append('price', comboData.price?.toString() || '');
    formData.append('status', comboData.status || '');


    this.combosService.updateCombo(formData, this.comboId).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Combo actualizado con éxito',
            showCancelButton: true
          });
        } else {
          console.error('La respuesta del servidor no contiene el ID del combo:', response);
        }
        this.router.navigate(['/combos']);
      },
      (error: any) => {
        if (error.status === 400) {
          Swal.fire({
            position: 'center',
            title: 'Algo salió mal, verifica que envías los datos correctamente',
            icon: 'warning',
            timer: 2000
          });
        }
      }
    );
  }
  }
