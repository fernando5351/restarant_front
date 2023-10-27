import { Component, OnInit } from '@angular/core';
import { CategoryDetail, Category } from '../../../models/category.models';
import { CategoryService } from '../../../services/category/category.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './patch-category.component.html',
  styleUrls: ['./patch-category.component.scss']
})
export class PatchCategoryComponent implements OnInit {

  imagePreview: string | File | Blob = '';
  selectedFile: File  | null = null;
  form: FormGroup = new FormGroup({});
  category: CategoryDetail = {
    id: 0
  }

  categoryDetail: Category = {
    id : 0,
    name: "",
    imgUrl: "",
    status: ""
  }

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      file: [null, [Validators.required]],
      status: ['Seleccionar', [Validators.required]]
    });

    this.route.paramMap.subscribe(params => {
      this.category.id = Number(params.get('id'));
      this.getCategoryById(this.category.id);
    });
  }

  getCategoryById(id: number) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (response) => {
        this.categoryDetail =  response.data;
        console.log(this.categoryDetail);

        this.form = this.formBuilder.group({
          name: [this.categoryDetail.name, [Validators.required]],
          status: [this.categoryDetail.status, [Validators.required]]
        });

        this.imagePreview = this.categoryDetail.imgUrl;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  isImageFile(file: File): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.avif|\.png|\.gif|\.webp|\.bmp|\.tiff|\.svg|\.svg)$/i;
    return allowedExtensions.test(file.name);
  }

  onFileSelected(event: any) {
    console.log(event.target.files.length);

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
        this.imagePreview = '';
      }
    } else {
      this.selectedFile = null;
      this.imagePreview = '';
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('status', this.form.get('status')?.value);
    formData.append('file', this.imagePreview);
    this.categoryService.patchCategory(formData, this.category.id).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate([`/categories`])
      },
      error: (error) => {
        if (error) {
          console.log(error);
        }
        console.log(error);
      }
    });
  }
}
