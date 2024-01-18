import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSaleComponent } from './GetSaleComponent';

describe('PatchComponent', () => {
  let component: GetSaleComponent;
  let fixture: ComponentFixture<GetSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
