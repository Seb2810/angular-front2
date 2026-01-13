import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmtomComponent } from './getmtom.component';

describe('GetmtomComponent', () => {
  let component: GetmtomComponent;
  let fixture: ComponentFixture<GetmtomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetmtomComponent]
    });
    fixture = TestBed.createComponent(GetmtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
