import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProduct, GetProduct, Products } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetIdService } from 'src/app/services/get-id.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  form: FormGroup = new FormGroup({});
  newImg: boolean = false;
  imagePreview: string | File | null = null;
  selectedFile: File | null = null;
  categoryId: number = 0;
  product: Products = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      //quantity: 1,
      status: '',
      categoryId: 0,
      imgUrl: null
  };

  GetProduct: GetProduct = {
    statusCode: 0,
    message: '',
    data: this.product
  }

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private getIdService: GetIdService,
    private activeRouter: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.categoryId = this.getIdService.getId();
    this.activeRouter.paramMap.subscribe(params => {
      const idProduct = Number(params.get('id'));
      this.getProduct(idProduct);
    });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      //quantity: ['', [Validators.required]],
      status: ['Estado', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', []],
      file: [null, []],
    });
  }

  getProduct(id: number){
    // console.log(id);
    this.productService.getProduct(id).subscribe({
      next: (data)=>{
        this.GetProduct = data;
        this.product = this.GetProduct.data;
        this.form = this.formBuilder.group({
          status: [this.product.status, [Validators.required]],
          name: [this.product.name, [Validators.required]],
          //quantity: [this.product.quantity, [Validators.required]],
          price: [this.product.price, [Validators.required]],
          description: [this.product.description, []],
          file: [null, []],
        })
        this.imagePreview = this.product.imgUrl;
        this.selectedFile = this.product.imgUrl;
      },
      error: (err) => {
        if (err.status == 403) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Tu usuario no esta autorizado para actualizar datos del producto',
            timer: 4000
          }).then(()=>{
            this.router.navigate(['/home'])
          });
        }
        console.error(err);
      },
    });
  }

  isImageFile(file: File): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.bmp|\.avif|\.tiff|\.svg)$/i;
    return allowedExtensions.test(file.name);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newImg = true;

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
        this.selectedFile = this.product.imgUrl;
        this.imagePreview = this.product.imgUrl;
      }
    } else {
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  sendRequest(event: Event) {
    event.preventDefault();

    const dto: CreateProduct = {
      name: this.form.get('name')?.value,
      status: this.form.get('status')?.value,
      //quantity: this.form.get('quantity')?.value,
      price: this.form.get('price')?.value,
      description: this.form.get('description')?.value,
      categoryId: this.categoryId,
      file: this.selectedFile
    };

    if (this.newImg) {
      if (this.selectedFile === null) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'El formulario no es válido o no se seleccionó ningún archivo',
          showConfirmButton: false,
          timer: 1000
        });
        return;
      }
    }

    if (this.form.invalid) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'El formulario no es válido, verifica que todo este correcto',
          showConfirmButton: false,
          timer: 1000
        })
      return;
    }

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
    if (dto.quantity !== undefined && dto.name !== undefined) {
      formData.append('name', dto.name);
      formData.append('status', dto.status);
      //formData.append('quantity', dto.quantity.toString());
      formData.append('price', dto.price.toString());
      formData.append('categoryId', dto.categoryId.toString());
      formData.append('description', dto.description);
      if (this.newImg) {
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El formulario no es válido',
        showConfirmButton: false,
        timer: 1000
      })
      return;
    }

    this.productService.patchProduct(formData, this.product.id).subscribe({
      next: (response) => {
        // console.log(response);
        this.router.navigate([`/products-category/${this.categoryId}`]);
      },
      error: (error) => {
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'error',
        //   title: error,
        //   showConfirmButton: false,
        //   timer: 2600
        // })
        if (error.status == 403) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Tu usuario no esta autorizado para actualizar datos del producto',
            timer: 4000
          })
        }
      }
    });
  }
}
