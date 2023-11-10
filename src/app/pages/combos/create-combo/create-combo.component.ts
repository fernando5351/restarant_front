import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CombosService } from 'src/app/services/combos/combos.service'; // Asegúrate de importar el servicio correcto
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-combo',
  templateUrl: './create-combo.component.html',
  styleUrls: ['./create-combo.component.scss']
})
export class CreateComboComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private comboService: CombosService, // Asegúrate de inyectar el servicio correcto
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      products: this.formBuilder.array([]),
    });
  }

  get productFormArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  addProduct() {
    const productFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });

    this.productFormArray.push(productFormGroup);
  }

  removeProduct(index: number) {
    this.productFormArray.removeAt(index);
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

  sendRequest() {
    if (this.form.invalid || this.productFormArray.length === 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El formulario no es válido o no se han agregado productos',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    const dto = {
      name: this.form.get('name')?.value,
      price: this.form.get('price')?.value,
      status: this.form.get('status')?.value,
      description: this.form.get('description')?.value,
      products: this.productFormArray.value,
    };

    const formData = new FormData();

    formData.append('name', this.form.get('name')?.value || '');
    formData.append('price', this.form.get('price')?.value || '');
    formData.append('status', this.form.get('status')?.value || '');
    formData.append('description', this.form.get('description')?.value || '');

    this.comboService.createCombo(formData).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error,
          showConfirmButton: false,
          timer: 2600
        });
      }
    });
  }
}
