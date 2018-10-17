import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRepsSearchComponent } from './compare-reps-search.component';

describe('CompareRepsSearchComponent', () => {
  let component: CompareRepsSearchComponent;
  let fixture: ComponentFixture<CompareRepsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareRepsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRepsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
