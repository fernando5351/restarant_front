import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { GetIdService } from 'src/app/services/get-id.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  categoryId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private getIdService: GetIdService,
  ) {}

  ngOnInit() {
    this.categoryId = this.getIdService.getId();

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      status: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
  }

  isImageFile(file: File): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.bmp|\.avif|\.tiff|\.svg)$/i;
    return allowedExtensions.test(file.name);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (this.isImageFile(file)) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target?.result as string;
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'El archivo seleccionado no es una imagen válida.',
          showConfirmButton: false,
          timer: 2000
        })
        this.selectedFile = null;
        this.imagePreview = null;
      }
    } else {
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  sendRequest(event: Event) {
    event.preventDefault();

    if (this.form.invalid || this.selectedFile === null) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El formulario no es válido o no se seleccionó ningún archivo',
        showConfirmButton: false,
        timer: 1000
      })
      return;
    }

    const dto: CreateProduct = {
      name: this.form.get('name')?.value,
      status: this.form.get('status')?.value,
      quantity: this.form.get('quantity')?.value,
      price: this.form.get('price')?.value,
      description: this.form.get('description')?.value,
      categoryId: this.categoryId,
      file: this.selectedFile
    };

    if (dto.price <= 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No puedes guardar un producto con valor a cero o menor',
        showConfirmButton: false,
        timer: 1600
      });
      return
    }

    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('status', dto.status);
    formData.append('quantity', dto.quantity.toString());
    formData.append('price', dto.price.toString());
    formData.append('description', dto.description);
    formData.append('categoryId', dto.categoryId.toString());
    formData.append('file', this.selectedFile);

    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([`/products-category/${this.categoryId}`]);
      },
      error: (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error,
          showConfirmButton: false,
          timer: 2600
        })
      }
    });
  }


}
