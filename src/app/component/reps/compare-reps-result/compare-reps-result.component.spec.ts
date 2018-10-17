import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRepsResultComponent } from './compare-reps-result.component';

describe('CompareRepsResultComponent', () => {
  let component: CompareRepsResultComponent;
  let fixture: ComponentFixture<CompareRepsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareRepsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRepsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
