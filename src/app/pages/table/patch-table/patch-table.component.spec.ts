import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchTableComponent } from './patch-table.component';

describe('PatchTableComponent', () => {
  let component: PatchTableComponent;
  let fixture: ComponentFixture<PatchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
