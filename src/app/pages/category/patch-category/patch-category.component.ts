import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDetail } from '../../../models/category.models';
import { CategoryService } from '../../../services/category/category.service';
import { NgForm } from '@angular/forms'; // Importa NgForm para trabajar con formularios

@Component({
  selector: 'app-get',
  templateUrl: './patch-category.component.html',
  styleUrls: ['./patch-category.component.scss']
})
export class PatchCategoryComponent implements OnInit {

  category: CategoryDetail = {
    id: 0
  }

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = Number(params.get('id'));
      this.getCategoryById(categoryId);
    });
    console.log(this.category)
  }

    getCategoryById(id: number): void {
      this.categoryService.getCategoryById(id).subscribe((data) => {
        this.category = data;
        console.log('Datos de categoría recibidos:', this.category);
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
