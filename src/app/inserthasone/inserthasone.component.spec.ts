import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserthasoneComponent } from './inserthasone.component';

describe('InserthasoneComponent', () => {
  let component: InserthasoneComponent;
  let fixture: ComponentFixture<InserthasoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InserthasoneComponent]
    });
    fixture = TestBed.createComponent(InserthasoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
