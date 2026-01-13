import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertmanyComponent } from './insertmany.component';

describe('InsertmanyComponent', () => {
  let component: InsertmanyComponent;
  let fixture: ComponentFixture<InsertmanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertmanyComponent]
    });
    fixture = TestBed.createComponent(InsertmanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
