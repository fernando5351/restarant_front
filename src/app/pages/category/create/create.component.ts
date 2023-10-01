import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  CreateCategory } from 'src/app/models/cat.models';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      file: [null,[Validators.required]],
      status: ['', [Validators.required]]
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

    const dto: CreateCategory = {
      name: this.form.get('name')?.value,
      status: this.form.get('status')?.value,
      file: this.selectedFile
    };

    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('status', dto.status);
    formData.append('file', this.selectedFile);


    this.categoryService.createCategory(formData).subscribe({
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
