import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetComboComponent } from './get-combo.component';

describe('GetComboComponent', () => {
  let component: GetComboComponent;
  let fixture: ComponentFixture<GetComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
