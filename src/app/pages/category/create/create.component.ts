import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  CreateCategories } from 'src/app/models/category.models';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router'
import Swal from'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File  | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      file: [null,[Validators.required]],
      status: ['Estado', [Validators.required]]
    });
  }

  isImageFile(file: File): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.avif|\.png|\.gif|\.webp|\.bmp|\.tiff|\.svg|\.svg)$/i;
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
      console.log('El formulario no es válido o no se seleccionó ningún archivo');
      return;
    }

    const dto: CreateCategories = {
      name: this.form.get('name')?.value,
      status: this.form.get('status')?.value,
      file : this.selectedFile
    };

    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('status', dto.status);
    formData.append('file', this.selectedFile);

    this.categoryService.createCategory(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
