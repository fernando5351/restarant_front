import { Component, OnInit } from '@angular/core';
import { GetCombos } from '../../../models/combo.model';
import { CombosService } from '../../../services/combos/combos.service';

@Component({
  selector: 'app-get-combo',
  templateUrl: './get-combo.component.html',
  styleUrls: ['./get-combo.component.scss']
})
export class GetComboComponent implements OnInit {
  url: string = '/create-combo';
  placeholder: string = 'Buscar combo ...';
  btn: string = 'Crear un combo';

  combos: GetCombos = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name: '',
        price: 0,
        status: '',
        Product: [
          {
            id: 0,
            name: '',
            price: 0,
            status: '',
            quantity: 0,
            imgUrl: null,
            categoryId: 0,
            description: ''
          }
        ]
      }
    ]
  };

  originalCombos: GetCombos = { statusCode: 0, message: '', data: [] };

  constructor(private comboService: CombosService) {}

  ngOnInit(): void {
    this.getCombos();
  }

  onSearchChange(name: string) {
    if (name.length > 0) {
      const combosTemporales = this.originalCombos.data;

      this.comboService.search(name).subscribe((response) => {
        // Actualiza solo los nombres y precios de los combos
        this.combos.data = response.data;

        // Itera sobre los combos y agrega los productos originales a cada combo
        this.combos.data.forEach((combo, index) => {
          const originalCombo = combosTemporales.find((c) => c.id === combo.id);
          if (originalCombo) {
            this.combos.data[index].Product = originalCombo.Product;
          }
        });
      });
    } else {
      this.getCombos();
    }
  }

  getCombos() {
    this.comboService.getCombos().subscribe((data) => {
      this.originalCombos = data;
      this.combos = { ...data };
      console.log(this.combos.data);
    });
  }
}
