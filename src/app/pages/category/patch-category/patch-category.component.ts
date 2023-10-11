import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDetail, Category } from '../../../models/category.models';
import { CategoryService } from '../../../services/category/category.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-get',
  templateUrl: './patch-category.component.html',
  styleUrls: ['./patch-category.component.scss']
})
export class PatchCategoryComponent implements OnInit {

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category.id = Number(params.get('id'));
      this.getCategoryById(this.category.id);
    });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

    getCategoryById(id: number): void {
      console.log('id recibo es: ' + id);

      this.categoryService.getCategoryById(id).subscribe({
        next: (response) => {
          this.categoryDetail =  response.data;
          console.log(this.categoryDetail);
          console.log(this.categoryDetail.imgUrl);

          this.form = this.formBuilder.group({
            name: [this.categoryDetail.name, [Validators.required]]
          })
        },
        error: (error) => {
          console.log(error);

        }
      });
    }

  // Método para manejar el evento de cambio de archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    // Aquí puedes realizar acciones adicionales, como cargar la imagen o mostrar una vista previa.
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    // Aquí puedes llamar al servicio para actualizar la categoría con los datos del formulario.
    // Ejemplo: this.categoryService.updateCategory(this.category).subscribe((result) => { ... });
  }
}
