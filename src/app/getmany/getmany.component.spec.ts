import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmanyComponent } from './getmany.component';

describe('GetmanyComponent', () => {
  let component: GetmanyComponent;
  let fixture: ComponentFixture<GetmanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetmanyComponent]
    });
    fixture = TestBed.createComponent(GetmanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
