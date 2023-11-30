import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchComboComponent } from './patch-combo.component';

describe('PatchComboComponent', () => {
  let component: PatchComboComponent;
  let fixture: ComponentFixture<PatchComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
