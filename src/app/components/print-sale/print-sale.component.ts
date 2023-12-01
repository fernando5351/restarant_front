import { Component, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PrintsaleService } from 'src/app/services/printsale/printsale.service';

@Component({
  selector: 'app-print-sale',
  templateUrl: './print-sale.component.html',
  styleUrls: ['./print-sale.component.scss']
})
export class PrintSaleComponent implements OnChanges, OnInit {

  @Output() print: boolean = false;
  saleInfo: any;

  horaActual = new Date();
  day = this.horaActual.getDate();
  month = this.horaActual.getMonth();
  year = this.horaActual.getFullYear();
  horas = this.horaActual.getHours();
  minutos = this.horaActual.getMinutes();

  ampm = this.horas >= 12 ? 'PM' : 'AM';
  horas12 = this.horas % 12 || 12;
  hora = `${this.horas12}:${this.minutos < 10 ? '0' : ''}${this.minutos} ${this.ampm}`;

  constructor(
    private printSaleService: PrintsaleService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.imprimirTicket()
  }

  ngOnInit(): void {
    this.printSaleService.miVariable$.subscribe(data => {
      console.log(`El valor de la variable cambio a: ${data}`);
    });
  }

  imprimirTicket() {
    this.printSaleService.printSale$.subscribe((data) => {
      // Procesar los datos recibidos y formular el ticket en tu plantilla HTML
      console.log('Datos para imprimir el ticket:', data);
      this.saleInfo = data;
      console.log(this.saleInfo);
    });
  }

}
