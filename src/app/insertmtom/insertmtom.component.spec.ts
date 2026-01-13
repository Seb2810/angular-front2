import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertmtomComponent } from './insertmtom.component';

describe('InsertmtomComponent', () => {
  let component: InsertmtomComponent;
  let fixture: ComponentFixture<InsertmtomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertmtomComponent]
    });
    fixture = TestBed.createComponent(InsertmtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
