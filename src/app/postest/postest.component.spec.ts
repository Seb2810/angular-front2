import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostestComponent } from './postest.component';

describe('PostestComponent', () => {
  let component: PostestComponent;
  let fixture: ComponentFixture<PostestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostestComponent]
    });
    fixture = TestBed.createComponent(PostestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
