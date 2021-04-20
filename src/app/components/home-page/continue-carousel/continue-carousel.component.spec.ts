import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueCarouselComponent } from './continue-carousel.component';

describe('ContinueCarouselComponent', () => {
  let component: ContinueCarouselComponent;
  let fixture: ComponentFixture<ContinueCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
