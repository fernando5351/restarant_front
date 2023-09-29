import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      status: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    } else {
      this.selectedFile = null;
      console.log(this.selectedFile);
    }
  }

  sendRequest(event: Event) {
    event.preventDefault();

    if (this.form.invalid || this.selectedFile === null) {
      console.log('El formulario no es válido o no se seleccionó ningún archivo');
      return;
    }

    const dto: CreateProduct = {
      name: this.form.get('name')?.value,
      status: this.form.get('status')?.value,
      quantity: this.form.get('quantity')?.value,
      price: this.form.get('price')?.value,
      description: this.form.get('description')?.value,
      categoryId: 1,
      file: this.selectedFile
    };

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
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
