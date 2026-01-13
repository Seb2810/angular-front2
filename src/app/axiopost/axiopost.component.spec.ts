import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxiopostComponent } from './axiopost.component';

describe('AxiopostComponent', () => {
  let component: AxiopostComponent;
  let fixture: ComponentFixture<AxiopostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AxiopostComponent]
    });
    fixture = TestBed.createComponent(AxiopostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
