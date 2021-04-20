import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComCarouselComponent } from './com-carousel.component';

describe('ComCarouselComponent', () => {
  let component: ComCarouselComponent;
  let fixture: ComponentFixture<ComCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
