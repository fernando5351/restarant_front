import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchCategoryComponent } from './patch-category.component';

describe('PatchCategoryComponent', () => {
  let component: PatchCategoryComponent;
  let fixture: ComponentFixture<PatchCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
