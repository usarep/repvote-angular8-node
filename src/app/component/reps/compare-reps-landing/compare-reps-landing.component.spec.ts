import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRepsLandingComponent } from './compare-reps-landing.component';

describe('CompareRepsLandingComponent', () => {
  let component: CompareRepsLandingComponent;
  let fixture: ComponentFixture<CompareRepsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareRepsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRepsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
