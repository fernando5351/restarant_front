import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() Input: string = 'Buscar';
  @Input() button: string = 'Crear';
  @Input() url: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  form:FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        search: ['',Validators.required]
      })
  }

  onSearchChange() {
    const searchText = this.form.get('search')?.value;
    this.searchChange.emit(searchText);
  }
}
